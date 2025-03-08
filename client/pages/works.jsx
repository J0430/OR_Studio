import React, { useState, useMemo, useCallback, useEffect } from "react";
import { fetchData } from "@utils/api";
import { AnimatePresence } from "framer-motion";
import {
  useProjectsPreloader,
  ProjectsPreloaderProvider,
} from "@contexts/ProjectsPreloaderContext"; // ✅ Import Provider
import { categories } from "@utils/globals";
import { fisherYatesShuffle, interleaveArrays } from "@utils/utils";
import dynamic from "next/dynamic";
import Head from "next/head";
import style from "@styles/pages/projects.module.scss";

const ProjectsModal = dynamic(
  () => import("@components/sections/projects/ProjectsModal/ProjectsModal"),
  { ssr: false }
);

const ProjectsPreloader = dynamic(
  () => import("@components/preloaders/ProjectsPreloader/ProjectsPreloader"),
  { ssr: false }
);

const ProjectsControl = dynamic(
  () => import("@components/sections/projects/ProjectsControl/ProjectsControl"),
  { loading: () => <div>Loading Categories...</div> }
);

const ProjectsGrid = dynamic(
  () => import("@components/sections/projects/ProjectsGrid/ProjectsGrid"),
  { ssr: false }
);

export async function getStaticProps() {
  try {
    const categoriesData = await Promise.all(
      ["residential", "commercial", "urbanPlanning", "office"].map(fetchData)
    );

    return {
      props: {
        residential: categoriesData[0],
        commercial: categoriesData[1],
        urbanPlanning: categoriesData[2],
        office: categoriesData[3],
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error.message);
    return {
      props: {
        residential: { projects: {}, frontImages: [], category: "" },
        commercial: { projects: {}, frontImages: [], category: "" },
        urbanPlanning: { projects: {}, frontImages: [], category: "" },
        office: { projects: {}, frontImages: [], category: "" },
      },
    };
  }
}

function ProjectsContent({ residential, commercial, urbanPlanning, office }) {
  const { isPreloaderVisible } = useProjectsPreloader(); // ✅ Now it's inside the Provider

  const [state, setState] = useState({
    categorySelected: categories[0] || "Works",
    selectedImage: null,
    selectedProject: null,
  });

  const categoryDataMap = useMemo(
    () => ({
      Residential: residential?.frontImages,
      "Urban Planning": urbanPlanning?.frontImages,
      Commercial: commercial?.frontImages,
      Office: office?.frontImages,
      Works: interleaveArrays([
        residential?.frontImages || [],
        urbanPlanning?.frontImages || [],
        commercial?.frontImages || [],
        office?.frontImages || [],
      ]),
    }),
    [residential, urbanPlanning, commercial, office]
  );

  const projects = useMemo(() => {
    return fisherYatesShuffle(categoryDataMap[state.categorySelected] || []);
  }, [state.categorySelected, categoryDataMap]);

  const handleCategoryClick = useCallback((categoryName) => {
    setState((prevState) => ({ ...prevState, categorySelected: categoryName }));
  }, []);

  const handleImageClick = useCallback(
    (imageSrc) => {
      const allProjects = {
        ...residential?.projects,
        ...urbanPlanning?.projects,
        ...commercial?.projects,
        ...office?.projects,
      };

      const matchedProject = Object.values(allProjects).find(
        (project) => project?.frontImage === imageSrc
      );

      if (matchedProject) {
        setState((prevState) => ({
          ...prevState,
          selectedImage: imageSrc,
          selectedProject: matchedProject,
        }));
      }
    },
    [residential, urbanPlanning, commercial, office]
  );

  const handleCloseModal = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      selectedImage: null,
      selectedProject: null,
    }));
  }, []);

  return (
    <>
      <Head>
        <title>Contact Us | OR Studio</title>
        <meta
          name="description"
          content="Get in touch with OR Studio to bring your architectural vision to life. Contact us today!"
        />
        <meta
          name="keywords"
          content="Architecture, Visualization, Contact, OR Studio"
        />
        <meta name="author" content="OR Studio" />
        <meta property="og:title" content="Contact Us | OR Studio" />
        <meta
          property="og:description"
          content="Get in touch with OR Studio to bring your architectural vision to life."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dugudxkyu/image/upload/v1728046515/Offir%20projects/Contact%20us/contact_us_uphao8.jpg"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {isPreloaderVisible && <ProjectsPreloader />}
      <main className={style.projectsPage}>
        <ProjectsControl
          categories={categories}
          selectedCategory={state.categorySelected}
          onCategorySelect={handleCategoryClick}
        />

        <ProjectsGrid
          projects={projects}
          category={state.categorySelected}
          onImageClick={handleImageClick}
        />

        <AnimatePresence>
          {state.selectedImage && state.selectedProject && (
            <ProjectsModal
              selectedImage={state.selectedImage}
              project={state.selectedProject}
              onClose={handleCloseModal}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

export default function ProjectsPage(props) {
  return (
    <ProjectsPreloaderProvider>
      {" "}
      {/* ✅ Wrap component inside provider */}
      <ProjectsContent {...props} />
    </ProjectsPreloaderProvider>
  );
}

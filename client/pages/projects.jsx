import React, { useState, useMemo, useCallback, useEffect } from "react";
import { fetchData } from "@utils/api";
import { AnimatePresence } from "framer-motion";
import { consumeDynamicAccess } from "next/dist/server/app-render/dynamic-rendering";
import {
  useProjectsPreloader,
  ProjectsPreloaderProvider,
} from "@contexts/ProjectsPreloaderContext";
import { categories } from "@utils/globals";
import { fisherYatesShuffle, interleaveArrays } from "@utils/utils";
import dynamic from "next/dynamic";
import Head from "next/head";
import style from "@styles/pages/projects.module.scss";

const ProjectsModal = dynamic(
  () => import("@components/sections/projects/ProjectsModal/ProjectsModal"),
  { loading: () => <div>Loading Modal...</div>, ssr: false }
);

const ProjectsPreloader = dynamic(
  () => import("@components/preloaders/ProjectsPreloader/ProjectsPreloader"),
  { loading: () => <div>Loading Projects...</div>, ssr: false }
);

const ProjectsControl = dynamic(
  () => import("@components/sections/projects/ProjectsControl/ProjectsControl"),
  { loading: () => <div>Loading Categories...</div> }
);

const ProjectsGrid = dynamic(
  () => import("@components/sections/projects/ProjectsGrid/ProjectsGrid"),
  { loading: () => <div>Loading Projects...</div>, ssr: false }
);

export async function getStaticProps() {
  try {
    const [residential, commercial, urbanPlanning, office] = await Promise.all([
      fetchData("residential"),
      fetchData("commercial"),
      fetchData("urbanPlanning"),
      fetchData("office"),
    ]);
    return {
      props: {
        residential,
        commercial,
        urbanPlanning,
        office,
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
  const [isClient, setIsClient] = useState(false);

  const [state, setState] = useState({
    categorySelected: categories[0] || "All",
    selectedImage: null,
    selectedProject: null,
  });

  useEffect(() => {
    setIsClient(true); // Ensures the code only runs on the client
  }, []);

  const categoryDataMap = useMemo(
    () => ({
      Residential: residential?.frontImages,
      "Urban Planning": urbanPlanning?.frontImages,
      Commercial: commercial?.frontImages,
      Office: office?.frontImages,
      All: interleaveArrays([
        residential?.frontImages || [],
        urbanPlanning?.frontImages || [],
        commercial?.frontImages || [],
        office?.frontImages || [],
      ]),
    }),
    [residential, urbanPlanning, commercial, office]
  );

  const { isPreloaderVisible } = useProjectsPreloader();

  const projects = useMemo(() => {
    const selectedImages = categoryDataMap[state.categorySelected] || [];
    return fisherYatesShuffle(selectedImages);
  }, [state.categorySelected, categoryDataMap]);

  const handleCategoryClick = useCallback((categoryName) => {
    setState((prevState) => ({ ...prevState, categorySelected: categoryName }));
  }, []);

  const handleImageClick = useCallback(
    (imageSrc) => {
      // Merge all projects from different categories
      const allProjects = {
        ...residential?.projects,
        ...urbanPlanning?.projects,
        ...commercial?.projects,
        ...office?.projects,
      };

      // Find the project that matches the clicked front image
      const matchedProject = Object.values(allProjects).find(
        (project) => project?.frontImage === imageSrc
      );

      if (matchedProject) {
        // Update state to open modal with the matched project
        setState((prevState) => ({
          ...prevState,
          selectedImage: imageSrc,
          selectedProject: matchedProject, // Pass entire project data
        }));
      } else {
        console.log("No project matched the image source:", imageSrc);
      }
    },
    [residential?.data, urbanPlanning?.data, commercial?.data, office?.data]
  );
  const handleCloseModal = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      selectedImage: null,
      selectedProject: null,
    }));
  }, []);

  if (!isClient) return null;

  return (
    <>
      <Head>
        <title>OR Studio | Work</title>
        <meta
          name="description"
          content="Explore our featured projects in various categories including residential, urban planning, and more."
        />
      </Head>
      {isPreloaderVisible && <ProjectsPreloader />}
      <div className={style.projectsPage}>
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
      </div>
    </>
  );
}

function ProjectsPage(props) {
  return (
    <ProjectsPreloaderProvider>
      <ProjectsContent {...props} />
    </ProjectsPreloaderProvider>
  );
}

export default ProjectsPage;

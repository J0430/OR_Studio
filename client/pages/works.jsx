import React, { useState, useMemo, useCallback } from "react";
import { fetchData } from "@utils/api";
import { AnimatePresence } from "framer-motion";
import {
  useWorksPreloader,
  WorksPreloaderProvider,
} from "@contexts/WorksPreloaderContext";
import { categories } from "@utils/globals";
import { loadDynamicImports } from "@utils/loadDynamicImports";
import { fisherYatesShuffle, interleaveArrays } from "@utils/utils";

import Head from "next/head";
import style from "@styles/pages/works.module.scss";
import dynamic from "next/dynamic";

// const WorksPreloader = dynamic(
//   () => import("@components/preloaders/WorksPreloader")
// );

// ✅ Dynamic Imports
const WorksPreloader = dynamic(
  () => import("@components/preloaders/WorksPreloader/WorksPreloader"),
  { ssr: false, loading: () => null }
);

const { WorksControl, WorksGrid, WorksModal } = loadDynamicImports(
  "sections/works",
  ["WorksControl", "WorksGrid", "WorksModal"]
);
//
export async function getStaticProps() {
  try {
    const categoriesData = await Promise.all(
      ["residential", "commercial", "urbanPlanning", "office"].map(fetchData)
    );

    return {
      props: {
        residential: categoriesData[0] || { projects: {} },
        commercial: categoriesData[1] || { projects: {} },
        urbanPlanning: categoriesData[2] || { projects: {} },
        office: categoriesData[3] || { projects: {} },
      },
    };
  } catch (error) {
    console.error("❌ Error in getStaticProps:", error.message);
    return {
      props: {
        residential: { projects: {} },
        commercial: { projects: {} },
        urbanPlanning: { projects: {} },
        office: { projects: {} },
      },
    };
  }
}

// ✅ Main WorksContent Component
function WorksContent({ residential, commercial, urbanPlanning, office }) {
  const { isPreloaderVisible } = useWorksPreloader();

  // ✅ State
  const [state, setState] = useState({
    categorySelected: categories[1] || "Residential",
    selectedImage: null,
    selectedProject: null,
  });

  // ✅ Category Mapping
  const categoryDataMap = useMemo(
    () => ({
      Residential: Object.values(residential?.projects || {}),
      "Urban Planning": Object.values(urbanPlanning?.projects || {}),
      Commercial: Object.values(commercial?.projects || {}),
      Office: Object.values(office?.projects || {}),
      Works: interleaveArrays([
        Object.values(residential?.projects || {}),
        Object.values(urbanPlanning?.projects || {}),
        Object.values(commercial?.projects || {}),
        Object.values(office?.projects || {}),
      ]).flat(),
    }),
    [residential, urbanPlanning, commercial, office]
  );

  // ✅ Shuffled Projects
  const works = useMemo(
    () => fisherYatesShuffle(categoryDataMap[state.categorySelected] || []),
    [state.categorySelected, categoryDataMap]
  );

  // ✅ Handle Category Click
  const handleCategoryClick = useCallback((categoryName) => {
    console.log("✅ Category selected:", categoryName);
    setState((prevState) => ({
      ...prevState,
      categorySelected: categoryName,
      selectedImage: null, // Reset modal when category changes
      selectedProject: null,
    }));
  }, []);

  // ✅ Handle Image Click (Main Debug)
  const handleImageClick = useCallback(
    (imageSrc) => {
      const currentProjectsArray =
        categoryDataMap[state.categorySelected] || [];

      // Log all frontImages and images array before searching
      currentProjectsArray.forEach((project) => {});

      let matchedProject = currentProjectsArray.find((project) => {
        return project.frontImage === imageSrc;
      });

      if (!matchedProject) {
        matchedProject = currentProjectsArray.find((project) => {
          return project.images?.includes(imageSrc);
        });
      }

      if (matchedProject) {
        setState((prevState) => ({
          ...prevState,
          selectedImage: imageSrc,
          selectedProject: matchedProject,
        }));
      } else {
        console.warn("❌ No matching project for image:", imageSrc);
      }
    },
    [categoryDataMap, state.categorySelected]
  );

  // ✅ Close Modal
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
        <title>OR Studio | Works</title>
      </Head>

      {isPreloaderVisible && <WorksPreloader />}

      <main className={style.worksPage}>
        <WorksControl
          categories={categories}
          selectedCategory={state.categorySelected}
          onCategorySelect={handleCategoryClick}
        />

        <WorksGrid
          works={works}
          category={state.categorySelected}
          onImageClick={handleImageClick} // ✅ Critical for opening modal
        />

        <AnimatePresence>
          {state.selectedImage && state.selectedProject && (
            <WorksModal
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

// ✅ Final Export Wrapped in Provider
export default function WorksPage(props) {
  return (
    <WorksPreloaderProvider>
      <WorksContent {...props} />
    </WorksPreloaderProvider>
  );
}

// pages/works.js
import {
  WorksPreloaderProvider,
  useWorksPreloader,
} from "@contexts/WorksPreloaderContext";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import { useState, useMemo, useCallback } from "react";
import { loadDynamicImports } from "@utils/loadDynamicImports";
import Head from "next/head";
import style from "@styles/pages/works.module.scss";
import { useNav } from "@contexts/NavContext";
import { usePreloader } from "@contexts/MainPreloaderContext";

// Dynamic Imports for components
const { WorksPreloader } = loadDynamicImports("preloaders", ["WorksPreloader"]);
const { WorksControl, WorksGrid, WorksModal } = loadDynamicImports(
  "sections/works",
  ["WorksControl", "WorksGrid", "WorksModal"]
);

function WorksContent() {
  const { isPreloaderVisible, preloadedImages, projectsData } =
    useWorksPreloader();
  const { isDevice } = usePreloader;
  const [state, setState] = useState({
    categorySelected: isDevice ? "Works" : "Residential", // Default category
    selectedImage: null,
    selectedProject: null,
  });

  // Category Data Mapping
  const categoryDataMap = useMemo(
    () => ({
      Residential: Object.values(projectsData.residential?.projects || {}),
      "Urban Planning": Object.values(
        projectsData.urbanPlanning?.projects || {}
      ),
      Commercial: Object.values(projectsData.commercial?.projects || {}),
      Office: Object.values(projectsData.office?.projects || {}),
    }),
    [projectsData]
  );

  const works = useMemo(() => {
    return categoryDataMap[state.categorySelected] || [];
  }, [state.categorySelected, categoryDataMap]);

  // Handle Category Click
  const handleCategoryClick = useCallback((categoryName) => {
    setState((prevState) => ({
      ...prevState,
      categorySelected: categoryName,
      selectedImage: null,
      selectedProject: null,
    }));
  }, []);

  // Handle Image Click
  const handleImageClick = useCallback(
    (imageSrc) => {
      const currentProjectsArray =
        categoryDataMap[state.categorySelected] || [];
      let matchedProject = currentProjectsArray.find(
        (project) => project.frontImage === imageSrc
      );

      if (!matchedProject) {
        matchedProject = currentProjectsArray.find((project) =>
          project.images?.includes(imageSrc)
        );
      }

      if (matchedProject) {
        setState((prevState) => ({
          ...prevState,
          selectedImage: imageSrc,
          selectedProject: matchedProject,
        }));
      }
    },
    [categoryDataMap, state.categorySelected]
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
        <title>OR Studio | Works</title>
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>

      {isPreloaderVisible && <WorksPreloader />}

      <main className={style.worksPage}>
        <WorksControl
          categories={Object.keys(categoryDataMap)}
          selectedCategory={state.categorySelected}
          onCategorySelect={handleCategoryClick}
        />

        <WorksGrid
          works={works}
          category={state.categorySelected}
          onImageClick={handleImageClick}
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

export default function WorksPage(props) {
  return (
    <WorksPreloaderProvider>
      <WorksContent />
    </WorksPreloaderProvider>
  );
}

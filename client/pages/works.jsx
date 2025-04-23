import { useState, useMemo, useCallback } from "react";
import {
  usePageContext,
  PageContextProvider,
} from "@contexts/PageContext/PageContext";
import { loadDynamicImports } from "@utils/loadDynamicImports";
import { AnimatePresence } from "framer-motion";
import style from "@styles/pages/works.module.scss";
import Head from "next/head";

// Dynamic Imports for components
const { WorksPreloader } = loadDynamicImports("preloaders", ["WorksPreloader"]);
console.log(WorksPreloader);
const { WorksControl, WorksGrid, WorksModal } = loadDynamicImports(
  "sections/works",
  ["WorksControl", "WorksGrid", "WorksModal"]
);
function WorksContent() {
  const { preloader, isPreloaderVisible, projectsData } = usePageContext();

  const [state, setState] = useState({
    categorySelected: "Residential",
    selectedImage: null,
    selectedProject: null,
  });

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

  const handleCategoryClick = useCallback((categoryName) => {
    setState((prev) => ({
      ...prev,
      categorySelected: categoryName,
      selectedImage: null,
      selectedProject: null,
    }));
  }, []);

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
        setState((prev) => ({
          ...prev,
          selectedImage: imageSrc,
          selectedProject: matchedProject,
        }));
      }
    },
    [categoryDataMap, state.categorySelected]
  );

  const handleCloseModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
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

      <main className={style.worksPage}>
        <WorksPreloader />
        <>
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
        </>
      </main>
    </>
  );
}

export default function WorksPage({
  residential,
  commercial,
  urbanPlanning,
  office,
}) {
  return (
    <PageContextProvider
      endpoints={["residential", "commercial", "urbanPlanning", "office"]}>
      <WorksContent />
    </PageContextProvider>
  );
}

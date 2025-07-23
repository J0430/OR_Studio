import { useState, useMemo, useCallback } from "react";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";

import { usePageContext, PageContextProvider } from "@contexts/PageContext";
import dynamic from "next/dynamic";

import { loadDynamicImports } from "@utils/loadDynamicImports";

import {
  residentialData,
  commercialData,
  urbanPlanningData,
  officeData,
} from "@public/data";

import styles from "@styles/pages/works.module.scss";

// ✅ Lazy-load content components only (not WorksPreloader)
const { WorksGrid, WorksControl } = loadDynamicImports("sections/works", [
  "WorksGrid",
  "WorksControl",
]);
const WorksModal = dynamic(
  () => import("@components/sections/works/WorksModal/WorksModal"),
  { ssr: false }
);
const WorksContent = () => {
  const { isPreloaderVisible } = usePageContext();

  const [state, setState] = useState({
    categorySelected: "All",
    selectedImage: null,
    selectedProject: null,
  });

  const categoryDataMap = useMemo(
    () => ({
      Residential: Object.values(residentialData.projects || {}),
      "Urban Planning": Object.values(urbanPlanningData.projects || {}),
      Commercial: Object.values(commercialData.projects || {}),
      Office: Object.values(officeData.projects || {}),
    }),
    []
  );

  const works = useMemo(() => {
    if (state.categorySelected === "All") {
      return [
        ...Object.values(residentialData.projects || {}),
        ...Object.values(commercialData.projects || {}),
        ...Object.values(urbanPlanningData.projects || {}),
        ...Object.values(officeData.projects || {}),
      ];
    }
    return categoryDataMap[state.categorySelected] || [];
  }, [state.categorySelected, categoryDataMap]);

  const handleCategoryClick = useCallback((categoryName) => {
    setState({
      categorySelected: categoryName,
      selectedImage: null,
      selectedProject: null,
    });
  }, []);

  const handleImageClick = useCallback((project) => {
    setState((prev) => ({
      ...prev,
      selectedImage: project.images[0].src,
      selectedProject: project,
    }));
  }, []);

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

      <main className={styles.worksPage}>
        {!isPreloaderVisible && (
          <>
            <WorksControl
              categories={Object.keys(categoryDataMap)}
              selectedCategory={state.categorySelected}
              onCategorySelect={handleCategoryClick}
            />
            <WorksGrid works={works} onImageClick={handleImageClick} />
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
        )}
      </main>
    </>
  );
};

export default function WorksPage() {
  const { WorksPreloader } = loadDynamicImports("preloaders", [
    "WorksPreloader",
  ]);
  return (
    <PageContextProvider
      preloader={<WorksPreloader />}
      timeoutDuration={1800} //
    >
      <WorksContent />
    </PageContextProvider>
  );
}

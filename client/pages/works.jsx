import { useState, useMemo, useCallback, useEffect } from "react";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { categories } from "utils/globals";

import {
  usePreloaderContext,
  PreloaderContextProvider,
} from "@contexts/PreloaderContext";

import dynamic from "next/dynamic";
import { loadDynamicImports } from "utils/loadDynamicImports";
import { useMediaQuery } from "react-responsive";

import {
  residentialData,
  commercialData,
  urbanPlanningData,
  officeData,
} from "@public/data";

import styles from "@styles/pages/works.module.scss";

// Lazy load modal only
const WorksModal = dynamic(
  () => import("@components/sections/works/WorksModal/WorksModal"),
  { ssr: false }
);

// Lazy load grid & controls
const { WorksGrid, WorksControl } = loadDynamicImports("sections/works", [
  "WorksGrid",
  "WorksControl",
]);

const WorksContent = () => {
  const { isPreloaderVisible } = usePreloaderContext();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const categoryDataMap = useMemo(
    () => ({
      Residential: Object.values(residentialData.projects || {}),
      "Urban Planning": Object.values(urbanPlanningData.projects || {}),
      Commercial: Object.values(commercialData.projects || {}),
      Office: Object.values(officeData.projects || {}),
      Animation: [], // Add later
    }),
    []
  );

  // All projects for mobile view
  const allProjects = useMemo(() => {
    return Object.values(categoryDataMap).flat();
  }, [categoryDataMap]);

  const [state, setState] = useState({
    categorySelected: isMobile ? null : categories?.[1],
    selectedImage: null,
    selectedProject: null,
  });

  // Update state on first mount if window size changes (hydration-safe)
  useEffect(() => {
    if (isMobile && state.categorySelected !== null) {
      setState((prev) => ({ ...prev, categorySelected: null }));
    }
    if (!isMobile && state.categorySelected === null) {
      setState((prev) => ({ ...prev, categorySelected: categories?.[0] }));
    }
  }, [isMobile]);

  const works = useMemo(() => {
    return state.categorySelected
      ? categoryDataMap[state.categorySelected]
      : allProjects;
  }, [state.categorySelected, categoryDataMap, allProjects]);

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

// Wrap in PageContext
export default function WorksPage() {
  const { WorksPreloader } = loadDynamicImports("preloaders", [
    "WorksPreloader",
  ]);
  return (
    <PreloaderContextProvider
      preloader={<WorksPreloader />}
      timeoutDuration={1800}>
      <WorksContent />
    </PreloaderContextProvider>
  );
}

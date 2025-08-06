import { useState, useMemo, useCallback, useEffect } from "react";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { categories } from "utils/globals";
import {
  useWorksPreloader,
  WorksPreloaderProvider,
} from "@contexts/WorksPreloaderContext";
import dynamic from "next/dynamic";

import { dynamicImportComponents } from "utils/dynamicImportComponents";

import {
  urbanPlanningData,
  commercialData,
  residentialData,
  officeData,
} from "@public/data";
import styles from "@styles/pages/works.module.scss";

// ✅ Dynamic Import (No SSR) for Modal
const WorksModal = dynamic(
  () => import("@components/sections/works/WorksModal/WorksModal"),
  { ssr: false }
);

// ✅ Lazy-load rest
const { WorksControl, WorksGrid } = dynamicImportComponents("sections/works", [
  "WorksControl",
  "WorksGrid",
]);

const { WorksPreloader } = dynamicImportComponents("preloaders", [
  "WorksPreloader",
]);
console.log(categories);

// ✅ Main Content
const WorksContent = () => {
  const { isPreloaderVisible } = useWorksPreloader();

  const [state, setState] = useState({
    categorySelected: categories[1] || "Residential",
    selectedImage: null,
    selectedProject: null,
  });

  const categoryDataMap = useMemo(
    () => ({
      Residential: Object.values(residentialData?.projects || {}),
      "Urban Planning": Object.values(urbanPlanningData?.projects || {}),
      Commercial: Object.values(commercialData?.projects || {}),
      Office: Object.values(officeData?.projects || {}),
    }),
    []
  );

  const works = useMemo(
    () => categoryDataMap[state.categorySelected] || [],
    [state.categorySelected, categoryDataMap]
  );

  const handleCategoryClick = useCallback((categoryName) => {
    setState((prevState) => ({
      ...prevState,
      categorySelected: categoryName,
      selectedImage: null,
      selectedProject: null,
    }));
  }, []);

  const handleImageClick = useCallback(
    (imageSrc) => {
      const currentProjects = categoryDataMap[state.categorySelected] || [];

      const matchedProject = currentProjects.find((project) =>
        project.images.some((img) => img.src === imageSrc)
      );

      if (matchedProject) {
        setState((prevState) => ({
          ...prevState,
          selectedImage: imageSrc,
          selectedProject: matchedProject,
        }));
      } else {
        console.warn("❌ No matching project found for:", imageSrc);
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

  useEffect(() => {
    if (state.selectedImage && state.selectedProject) {
      console.log("🟢 Updated state:");
      console.log("Selected image in state:", state.selectedImage);
      console.log("Selected project in state:", state.selectedProject);
    }
  }, [state.selectedImage, state.selectedProject]);
  return (
    <>
      {isPreloaderVisible && <WorksPreloader />}
      <main className={styles.worksPage}>
        <WorksControl
          categories={Object.keys(categoryDataMap)}
          selectedCategory={state.categorySelected}
          onCategorySelect={handleCategoryClick}
        />

        <WorksGrid
          works={works}
          selectedImage={state.selectedImage}
          onImageClick={handleImageClick}
        />

        <AnimatePresence mode="wait">
          {state.selectedImage && state.selectedProject && (
            <WorksModal
              state={state}
              selectedImage={state.selectedImage}
              project={state.selectedProject}
              onClose={handleCloseModal}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

// ✅ Wrapped Export
export default function WorksPage(props) {
  return (
    <>
      <Head>
        <title>OR Studio | Works</title>
        <meta
          name="description"
          content="Discover OR Studio's Residential, Urban Planning, Commercial and Office Architecture Projects."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <WorksPreloaderProvider>
        <WorksContent {...props} />
      </WorksPreloaderProvider>
    </>
  );
}

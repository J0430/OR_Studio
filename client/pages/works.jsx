import { useState, useMemo, useCallback, useEffect } from "react";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { categories } from "utils/globals";

import dynamic from "next/dynamic";

import { dynamicImportComponents } from "utils/dynamicImportComponents";

import {
  urbanPlanningData,
  commercialData,
  residentialData,
  officeData,
} from "@public/data";

import styles from "@styles/pages/works.module.scss";
import LogoPreloader from "components/preloaders/LogoPreloader/LogoPreloader";

// ✅ Dynamic Import (No SSR) for Modal
const WorksModal = dynamic(
  () => import("components/sections/works/WorksModal/WorksModal"),
  { ssr: false }
);

const { WorksControl, WorksGrid } = dynamicImportComponents("sections/works", [
  "WorksControl",
  "WorksGrid",
]);

const { WorksPreloader } = dynamicImportComponents("preloaders", [
  "WorksPreloader",
]);

const WorksPage = () => {
  const [state, setState] = useState({
    categorySelected: categories[1] || "Residential",
    selectedImage: null,
    selectedProject: null,
    hasOpened: null,
  });

  // for first-open behavior

  const closeModal = useCallback(() => setSelected(null), []);

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

  const handleImageClick = useCallback(
    (imageSrc, layoutId) => {
      const currentProjects = categoryDataMap[state.categorySelected] || [];

      const matchedProject = currentProjects.find((project) =>
        project.images.some((img) => img.src === imageSrc)
      );

      if (matchedProject) {
        console.log(imageSrc, state.categorySelected);
        setState((prevState) => ({
          ...prevState,
          selectedImage: imageSrc,
          selectedProject: matchedProject,
          hasOpened: true,
        }));
      } else {
        console.warn("❌ No matching project found for:", imageSrc);
      }
    },
    [categoryDataMap, state.categorySelected]
  );
  const handleCategoryClick = useCallback((categoryName) => {
    setState((prevState) => ({
      ...prevState,
      categorySelected: categoryName,
      selectedImage: null,
      selectedProject: null,
    }));
    console.log(state, "state");
  }, []);

  console.log(state.categorySelected, "state.categorySelected");
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
        <meta
          name="description"
          content="Discover OR Studio's Residential, Urban Planning, Commercial and Office Architecture Projects."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <LogoPreloader duration={1.5} />
      <main className={styles.worksPage}>
        <WorksControl
          categories={Object.keys(categoryDataMap)}
          selectedCategory={state.categorySelected}
          onCategorySelect={handleCategoryClick}
        />

        <WorksGrid
          works={works}
          selectedImage={state.selectedImage}
          categorySelected={state.categorySelected}
          onImageClick={handleImageClick}
          hasOpened={state.hasOpened}
        />

        <AnimatePresence mode="wait">
          {state.selectedImage && state.selectedProject && (
            <WorksModal
              state={state}
              layoutId={state.selectedImage}
              selectedImage={state.selectedImage}
              project={state.selectedProject}
              onClose={handleCloseModal}
              firstOpen={!state.hasOpened}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
};
export default WorksPage;

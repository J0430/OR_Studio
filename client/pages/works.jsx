import { useState, useMemo, useCallback } from "react";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { categories } from "utils/globals";
import {
  useWorksPreloader,
  WorksPreloaderProvider,
} from "@contexts/WorksPreloaderContext";
import dynamic from "next/dynamic";
import {
  fisherYatesShuffle,
  interleaveArrays,
  shuffleProjectImages,
} from "utils/utils";
import { loadDynamicImports } from "utils/loadDynamicImports";

import {
  residentialData,
  commercialData,
  urbanPlanningData,
  officeData,
} from "@public/data";

import styles from "@styles/pages/works.module.scss";

// ✅ Dynamic Import (No SSR) for Modal
const WorksModal = dynamic(
  () => import("@components/sections/works/WorksModal/WorksModal"),
  { ssr: false }
);

// ✅ Lazy-load rest
const { WorksControl, WorksGrid } = loadDynamicImports("sections/works", [
  "WorksControl",
  "WorksGrid",
]);

const { WorksPreloader } = loadDynamicImports("preloaders", ["WorksPreloader"]);

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
      Residential: shuffleProjectImages(
        Object.values(residentialData?.projects || {})
      ),
      "Urban Planning": shuffleProjectImages(
        Object.values(urbanPlanningData?.projects || {})
      ),
      Commercial: shuffleProjectImages(
        Object.values(commercialData?.projects || {})
      ),
      Office: shuffleProjectImages(Object.values(officeData?.projects || {})),
    }),
    []
  );

  const works = useMemo(
    () => fisherYatesShuffle(categoryDataMap[state.categorySelected] || []),
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

  const handleImageClick = useCallback((work) => {
    setState((prevState) => ({
      ...prevState,
      selectedImage: work.images[0].src,
      selectedProject: work,
    }));
  }, []);

  const handleCloseModal = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      selectedImage: null,
      selectedProject: null,
    }));
  }, []);

  return (
    <>
      {isPreloaderVisible && <WorksPreloader />}
      <main className={styles.worksPage}>
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
      </main>
    </>
  );
};

// ✅ Wrapped Export
export default function WorksPage() {
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
        <WorksContent />
      </WorksPreloaderProvider>
    </>
  );
}

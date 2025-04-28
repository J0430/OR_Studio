import { useState, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { usePageContext, PageContextProvider } from "@contexts/PageContext";
import { loadDynamicImports } from "@utils/loadDynamicImports";
import {
  residentialData,
  commercialData,
  urbanPlanningData,
  officeData,
} from "@public/data";

import styles from "@styles/pages/works.module.scss";

const WorksContent = () => {
  const { isPreloaderVisible, isDevice } = usePageContext();

  const { WorksControl, WorksModal, WorksPreloader } = useMemo(
    () =>
      loadDynamicImports("sections/works", [
        "WorksControl",
        "WorksModal",
        "WorksPreloader",
      ]),
    []
  );

  const [state, setState] = useState({
    categorySelected: "Residential",
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

  const works = useMemo(
    () => categoryDataMap[state.categorySelected] || [],
    [state.categorySelected, categoryDataMap]
  );

  const handleCategoryClick = useCallback((categoryName) => {
    setState({
      categorySelected: categoryName,
      selectedImage: null,
      selectedProject: null,
    });
  }, []);

  const handleImageClick = useCallback(
    (project) => {
      setState({
        ...state,
        selectedImage: project.images[0].src,
        selectedProject: project,
      });
    },
    [state]
  );

  const handleCloseModal = useCallback(() => {
    setState({
      ...state,
      selectedImage: null,
      selectedProject: null,
    });
  }, [state]);

  const WorksGridItem = ({ work, index }) => {
    return (
      <motion.article
        className={styles.worksGridItem}
        layoutId={`work-item-${work.images[0].src}`}
        onClick={() => handleImageClick(work)}
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: "easeOut",
            delay: index * 0.05,
          },
        }}>
        <div className={styles.hoverWrapper}>
          <Image
            src={work.images[0].src}
            alt={`Project: ${work.title}`}
            fill
            styles={{ objectFit: "cover" }}
            className={styles.worksImage}
          />
        </div>
      </motion.article>
    );
  };

  const WorksGrid = () => (
    <div className={styles.worksGrid}>
      {works.map((work, index) => (
        <WorksGridItem key={work.title + index} work={work} index={index} />
      ))}
    </div>
  );

  return (
    <>
      <Head>
        <title>OR Studio | Works</title>
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>

      <main className={styles.worksPage}>
        <WorksPreloader />

        {!isPreloaderVisible && (
          <>
            <WorksControl
              categories={Object.keys(categoryDataMap)}
              selectedCategory={state.categorySelected}
              onCategorySelect={handleCategoryClick}
            />

            <WorksGrid />

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
  const { WorksPreloader } = useMemo(
    () => loadDynamicImports("preloaders", ["WorksPreloader"]),
    []
  );

  return (
    <PageContextProvider preloader={<WorksPreloader />}>
      <WorksContent />
    </PageContextProvider>
  );
}

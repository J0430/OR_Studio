"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { usePreloader } from "@contexts/MainPreloaderContext";
import { useNav } from "@contexts/NavContext";
import { useFetchData } from "@hooks/useFetchData";
import styles from "@styles/pages/home.module.scss";
import MainPreloader from "@components/preloaders/MainPreloader/mainpreloader/MainPreloader";
import DirectionalButton from "@components/common/DirectionalButton";
import Head from "next/head";

const LandingPage = dynamic(
  () => import("@components/sections/home/LandingPage/LandingPage")
);
const AboutBanner = dynamic(
  () => import("@components/sections/home/AboutBanner/AboutBanner")
);
const ProjectBanner = dynamic(
  () => import("@components/sections/home/ProjectBanner/ProjectBanner")
);

export default function Home() {
  const { data: homeData, loading, error } = useFetchData("homeData.json");
  const { isPreloaderVisible, onImageLoad } = usePreloader();
  const { isNavOpen } = useNav();

  const [isPageReady, setIsPageReady] = useState(false);
  useEffect(() => {
    if (!loading && !isPreloaderVisible) {
      setIsPageReady(true);
    }
  }, [loading, isPreloaderVisible]);

  const handleScroll = useCallback((targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (!isPageReady) {
    return <MainPreloader />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error loading data</h2>
        <p>{error}</p>
      </div>
    );
  }
  if (!homeData) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  const {
    HomePictures = [],
    Even_Yehuda = [],
    Hevron8 = [],
    City69 = [],
  } = homeData;

  const sections = [
    { component: <LandingPage images={HomePictures} />, id: "landingPage" },
    { component: <AboutBanner />, id: "aboutBanner" },
    { component: <ProjectBanner images={Even_Yehuda} />, id: "evenYehuda" },
    { component: <ProjectBanner images={Hevron8} />, id: "hevron8" },
    { component: <ProjectBanner images={City69} />, id: "last-section" },
  ];

  return (
    <>
      <Head>
        <title>OR Studio - Architectural Visualization</title>
        <meta
          name="description"
          content="Architectural visualization by OR Studio."
        />
      </Head>

      <motion.div
        key="homePage"
        className={styles.homePage}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 1.5 } }}
        transition={{ duration: 1.5, ease: "easeOut" }}>
        {sections.map((section, index) => (
          <div
            id={section.id}
            key={section.id}
            className={styles.sectionContainer}>
            {section.component}

            {!isNavOpen &&
              (index < sections.length - 1 ? (
                <DirectionalButton
                  direction="down"
                  width={3}
                  height={3}
                  onClick={() => handleScroll(sections[index + 1]?.id)}
                />
              ) : (
                <DirectionalButton
                  direction="up"
                  width={3}
                  height={3}
                  onClick={() => handleScroll(sections[0]?.id)}
                />
              ))}
          </div>
        ))}
      </motion.div>
    </>
  );
}

"use client";

import React, { useCallback, useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { usePreloader } from "@contexts/MainPreloaderContext";
import { useNav } from "@contexts/NavContext";
import { useFetchData } from "@hooks/useFetchData";
import { preloadImages } from "@utils/imageUtils";
import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "@styles/pages/home.module.scss";
import MainPreloader from "@components/preloaders/MainPreloader/mainpreloader/MainPreloader";
import DirectionalButton from "@components/common/DirectionalButton";
import ErrorBoundary from "@components/ErrorBoundary"; // Import ErrorBoundary component

const LandingPage = dynamic(
  () => import("@components/sections/home/LandingPage/LandingPage"),
  { suspense: true }
);
const AboutBanner = dynamic(
  () => import("@components/sections/home/AboutBanner/AboutBanner"),
  { suspense: true }
);
const ProjectBanner = dynamic(
  () => import("@components/sections/home/ProjectBanner/ProjectBanner"),
  { suspense: true }
);

export default function Home() {
  const { data: homeData, loading, error } = useFetchData("homeData.json");
  const { isPreloaderVisible, onImageLoad } = usePreloader();
  const { isNavOpen } = useNav();

  const [isPageReady, setIsPageReady] = useState(false);

  // Set isPageReady when loading and preloader visibility change
  useEffect(() => {
    if (!loading && !isPreloaderVisible) {
      setIsPageReady(true);
    }
  }, [loading, isPreloaderVisible]);

  // Preload images when homeData is available
  useEffect(() => {
    if (homeData) {
      preloadImages(
        [
          ...homeData.HomePictures,
          ...homeData.Even_Yehuda,
          ...homeData.Hevron8,
          ...homeData.City69,
        ],
        onImageLoad
      );
    }
  }, [homeData, onImageLoad]);

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
        <meta
          property="og:title"
          content="OR Studio - Architectural Visualization"
        />
        <meta
          property="og:description"
          content="Architectural visualization by OR Studio."
        />
        <meta property="og:image" content="/assets/social-preview.png" />
        <meta property="og:url" content="https://orstudio.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <motion.div
        key="homePage"
        className={styles.homePage}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 1.5 } }}
        transition={{ duration: 1.5, ease: "easeOut" }}>
        {sections.map((section, index) => (
          <ErrorBoundary key={section.id}>
            <div id={section.id} className={styles.sectionContainer}>
              <Suspense fallback={<div>Loading Section...</div>}>
                {section.component}
              </Suspense>

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
          </ErrorBoundary>
        ))}
      </motion.div>
    </>
  );
}

"use client";

import React, { useCallback, useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { usePreloader } from "@contexts/MainPreloaderContext";
import { useNav } from "@contexts/NavContext";
import { useFetchData } from "@hooks/useFetchData"; // ✅ Already preloads images
import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "@styles/pages/home.module.scss";
import MainPreloader from "@components/preloaders/MainPreloader/mainpreloader/MainPreloader";
import DirectionalButton from "@components/common/DirectionalButton";

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

  const { isPreloaderVisible } = usePreloader();
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
  const projectsMap = Object.fromEntries(
    homeData?.projects.map((project) => [project.id, project.images]) || []
  );

  const LandingPictures = projectsMap["LandingPictures"] || [];
  const EvenYehuda = projectsMap["EvenYehuda"] || [];
  const Hevron8 = projectsMap["Hevron8PenthouseRooftop"] || [];
  const City69 = projectsMap["City69"] || [];

  const sections = [
    { component: <LandingPage images={LandingPictures} />, id: "landingPage" },
    { component: <AboutBanner />, id: "aboutBanner" },
    { component: <ProjectBanner images={EvenYehuda} />, id: "evenYehuda" },
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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}>
        {sections.map((section, index) => (
          <div
            id={section.id}
            key={section.id}
            className={styles.sectionContainer}>
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
        ))}
      </motion.div>
    </>
  );
}

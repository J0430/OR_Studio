"use client";

import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { usePreloader } from "../contexts/PreloaderContext";
import styles from "../styles/home.module.scss";
import Preloader from "../components/preloader/Preloader";
import DirectionalButton from "../components/common/DirectionalButton";
import { HomePictures, Even_Yehuda, Hevron8, City69 } from "../globals/globals";
import Head from "next/head";

// Dynamically import components to improve performance
const LandingPage = dynamic(() => import("../components/home/LandingPage"));
const AboutBanner = dynamic(() => import("../components/home/AboutBanner"));
const ProjectBanner = dynamic(() => import("../components/home/ProjectBanner"));

export default function Home() {
  const { isPreloaderVisible } = usePreloader();

  // Section configuration with dynamic imports
  const sections = [
    { component: <LandingPage images={HomePictures} />, id: "landingPage" },
    { component: <AboutBanner />, id: "aboutBanner" },
    { component: <ProjectBanner images={Even_Yehuda} />, id: "evenYehuda" },
    { component: <ProjectBanner images={Hevron8} />, id: "hevron8" },
    { component: <ProjectBanner images={City69} />, id: "last-section" },
  ];

  // Scroll handler with useCallback for optimization
  const handleScroll = useCallback((targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (isPreloaderVisible) {
    return <Preloader />;
  }

  return (
    <>
      <Head>
        <title>OR Studio - Architectural Visualization</title>
        <meta
          name="description"
          content="Architectural visualization by OR Studio."
        />
      </Head>

      <div className={styles.homePage}>
        {sections.map((section, index) => (
          <div
            id={section.id}
            key={section.id}
            className={styles.sectionContainer}>
            {section.component}

            {/* Directional Buttons for Navigation */}

            {index < sections.length - 1 ? (
              <DirectionalButton
                direction="down"
                onClick={() => handleScroll(sections[index + 1]?.id)}
              />
            ) : (
              <DirectionalButton
                direction="up"
                onClick={() => handleScroll(sections[0]?.id)}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

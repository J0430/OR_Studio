"use client";

import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { usePreloader } from "@contexts/MainPreloaderContext";
import { useNav } from "@contexts/NavContext";
import styles from "@styles/home.module.scss";
import MainPreloader from "@components/preloaders/MainPreloader/MainPreloader";
import DirectionalButton from "@components/common/DirectionalButton";
import { HomePictures, Even_Yehuda, Hevron8, City69 } from "@utils/globals";
import Head from "next/head";

const LandingPage = dynamic(
  () => import("@components/sections/home/LandingPage")
);
const AboutBanner = dynamic(
  () => import("@components/sections/home/AboutBanner")
);
const ProjectBanner = dynamic(
  () => import("@components/sections/home/ProjectBanner")
);

export default function Home() {
  const { isPreloaderVisible, onImageLoad } = usePreloader();
  const { isNavOpen } = useNav();

  const sections = [
    {
      component: (
        <LandingPage images={HomePictures} onImageLoad={onImageLoad} />
      ),
      id: "landingPage",
    },
    { component: <AboutBanner onImageLoad={onImageLoad} />, id: "aboutBanner" },
    {
      component: (
        <ProjectBanner images={Even_Yehuda} onImageLoad={onImageLoad} />
      ),
      id: "evenYehuda",
    },
    {
      component: <ProjectBanner images={Hevron8} onImageLoad={onImageLoad} />,
      id: "hevron8",
    },
    {
      component: <ProjectBanner images={City69} onImageLoad={onImageLoad} />,
      id: "last-section",
    },
  ];

  const handleScroll = useCallback((targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <Head>
        <title>OR Studio - Architectural Visualization</title>
        <meta
          name="description"
          content="Architectural visualization by OR Studio."
        />
      </Head>

      <AnimatePresence mode="wait">
        {isPreloaderVisible ? (
          <MainPreloader key="preloader" />
        ) : (
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
        )}
      </AnimatePresence>
    </>
  );
}

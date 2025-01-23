"use client";

import React from "react";
import LandingPage from "components/home/LandingPage";
import AboutBanner from "components/home/AboutBanner";
import ProjectBanner from "components/home/ProjectBanner";
import ScrollArrow from "components/common/DirectionalButton";
import { HomePictures, Even_Yehuda, Hevron8, City69 } from "globals/globals";

import useTimeout from "hooks/useTimeout";
import Preloader from "components/preloader/Preloader";
import styles from "styles/home.module.scss";

export default function Home() {
  const navigationType = performance.getEntriesByType("navigation")[0]?.type;
  const preloaderDone =
    navigationType === "reload" ||
    (navigationType === "navigate" && window.location.pathname === "/")
      ? useTimeout(4000)
      : false;

  const sections = [
    {
      component: <LandingPage images={HomePictures} />,
      id: "landingPage",
    },
    {
      component: <AboutBanner />,
      id: "evenYehuda",
    },
  ];

  return (
    <div className={styles.homePage}>
      {sections.map((section, index) => (
        <div id={section.id} key={index} className={styles.sectionContainer}>
          {section.component}
          {index < sections.length - 1 && (
            <ScrollArrow targetId={sections[index + 1].id} />
          )}
          {index === sections.length - 1 && (
            <ScrollArrow targetId={sections[0].id} isLastSection={true} />
          )}
        </div>
      ))}
    </div>
  );
}

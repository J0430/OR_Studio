"use client";

import React from "react";
import LandingPage from "../components/home/LandingPage";
import AboutBanner from "../components/home/AboutBanner";
import ProjectBanner from "../components/home/ProjectBanner";
import ScrollArrow from "../components/common/ScrollArrow";
import { HomePictures, Even_Yehuda, Hevron8, City69 } from "../globals/globals";
import useTimeout from "../hooks/useTimeout";
import Preloader from "../components/preloader/Preloader";
import styles from "../components/home/ProjectBanner.module.scss";

export default function Home() {
  const preloaderDone = useTimeout(4000); // Use the custom hook for preloader logic

  const sections = [
    {
      component: <LandingPage images={HomePictures} />,
      id: "landinPage",
    },
    {
      component: <AboutBanner />,
      id: "evenYehuda",
    },
    {
      component: <ProjectBanner images={Even_Yehuda} />,
      id: "mika12",
    },
    {
      component: <ProjectBanner images={Hevron8} />,
      id: "hevron8",
    },
    {
      component: <ProjectBanner images={City69} />,
      id: "last-section",
    },
  ];

  if (!preloaderDone) {
    return <Preloader />;
  }

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

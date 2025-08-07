import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { officeData } from "@public/data";
import { dynamicImportComponents } from "utils/dynamicImportComponents";
import Head from "next/head";
import dynamic from "next/dynamic";
import DirectionalButton from "@components/common/DirectionalButton/DirectionalButton";
import SectionWrapper from "@components/common/SectionWrapper/SectionWrapper";
import styles from "@styles/pages/home.module.scss";
import ScrollSectionNavigation from "@components/common/ScrollSectionNavigator/ScrollSectionNavigator";

const { LandingAbout } = dynamicImportComponents("sections/about", [
  "LandingAbout",
]);

export default function About() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [isPageReady, setIsPageReady] = useState(false);

  const handleScroll = useCallback((targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const beaconProject = officeData.projects?.o_project1;

  const sections = [
    {
      component: <LandingAbout images={beaconProject?.images} />,
      id: "landingAbout",
    },
  ];
  if (sections.length === 1) return sections[0].component;

  return (
    <>
      <Head>
        <title>OR Studio | About</title>
      </Head>
      <>
        <div className={styles.homePage}>
          {sections.map((section, index) => (
            <SectionWrapper key={section.id} id={section.id}>
              <div
                data-section-id={section.id}
                className={styles.sectionContainer}>
                {section.component}

                <ScrollSectionNavigation
                  sections={sections.map((section) => section.id)}
                />
                <DirectionalButton
                  direction={index < sections.length - 1 ? "down" : "up"}
                  width={isMobile ? 2.3 : 3}
                  height={isMobile ? 2.3 : 3}
                  onClick={() =>
                    handleScroll(sections[(index + 1) % sections.length]?.id)
                  }
                />
              </div>
            </SectionWrapper>
          ))}
        </div>
      </>
    </>
  );
}

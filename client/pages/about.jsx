import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { usePreloader } from "@contexts/MainPreloaderContext";
import { useNav } from "@contexts/NavContext";
import { fetchData } from "@utils/api";
import { loadDynamicImports } from "@utils/loadDynamicImports";
import Head from "next/head";
import dynamic from "next/dynamic";
import DirectionalButton from "@components/common/DirectionalButton/DirectionalButton";
import SectionWrapper from "@components/common/SectionWrapper/SectionWrapper";
import MainPreloader from "@components/preloaders/MainPreloader/MainPreloader";
import styles from "@styles/pages/home.module.scss";
import ScrollSectionNavigation from "@components/common/ScrollSectionNavigator/ScrollSectionNavigator";

const { LandingAbout } = loadDynamicImports("sections/about", ["LandingAbout"]);

export const getStaticProps = async () => {
  try {
    const officeData = await fetchData("office");
    return { props: { officeData } };
  } catch (error) {
    console.error("Error in getStaticProps:", error.message);
    return {
      props: { officeData: { projects: {}, frontImages: [], category: "" } },
    };
  }
};

export default function About({ officeData }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { isNavOpen } = useNav();
  const { isPreloaderVisible } = usePreloader();
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    if (!isPreloaderVisible) {
      const timeout = setTimeout(() => setIsPageReady(true));
      return () => clearTimeout(timeout);
    }
  }, [isPreloaderVisible]);

  const handleScroll = useCallback((targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const beaconProject = officeData.projects?.o_project1;
  console.log(beaconProject?.images);

  const sections = [
    {
      component: <LandingAbout images={beaconProject?.images} />,
      id: "landingAbout",
    },
    // { component: <AboutBanner />, id: "aboutBanner" },
    // {
    //   component: <WorkBanner images={EvenYehuda?.images} />,
    //   id: "evenYehuda",
    // },
    // {
    //   component: <WorkBanner images={Hevron8PenthouseRooftop?.images} />,
    //   id: "hevron8",
    // },
    // {
    //   component: <WorkBanner images={City69?.images} />,
    //   id: "last-section",
    // },
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

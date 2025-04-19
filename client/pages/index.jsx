import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { usePreloader } from "@contexts/MainPreloaderContext";
import { useNav } from "@contexts/NavContext";
import { fetchData } from "@utils/api";
import { loadDynamicImports } from "@utils/loadDynamicImports";
import Head from "next/head";
import dynamic from "next/dynamic";
import ScrollSectionNavigation from "@components/common/ScrollSectionNavigator/ScrollSectionNavigator";
import DirectionalButton from "@components/common/DirectionalButton/DirectionalButton";
import SectionWrapper from "@components/common/SectionWrapper/SectionWrapper";
import MainPreloader from "@components/preloaders/MainPreloader/MainPreloader";
import styles from "@styles/pages/home.module.scss";

const { LandingPage, AboutBanner, WorkBanner } = loadDynamicImports(
  "sections/home",
  ["LandingPage", "AboutBanner", "WorkBanner"]
);

export const getStaticProps = async () => {
  try {
    const homeData = await fetchData("home");
    return { props: { homeData } };
  } catch (error) {
    console.error("Error in getStaticProps:", error.message);
    return {
      props: { homeData: { projects: {}, frontImages: [], category: "" } },
    };
  }
};
export default function Home({ homeData }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { isNavOpen } = useNav();
  const { isPreloaderVisible } = usePreloader();
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    if (!isPreloaderVisible) {
      const timeout = setTimeout(() => setIsPageReady(true), 100);
      return () => clearTimeout(timeout);
    }
  }, [isPreloaderVisible]);

  const handleScroll = useCallback((targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const { LandingPictures, EvenYehuda, Hevron8PenthouseRooftop, City69 } =
    homeData.projects || {};
  console.log(LandingPictures.images);

  const sections = [
    {
      component: <LandingPage images={LandingPictures?.images} />,
      id: "landingPage",
    },
    { component: <AboutBanner />, id: "aboutBanner" },
    {
      component: <WorkBanner images={EvenYehuda?.images} />,
      id: "evenYehuda",
    },
    {
      component: <WorkBanner images={Hevron8PenthouseRooftop?.images} />,
      id: "hevron8",
    },
    {
      component: <WorkBanner images={City69?.images} />,
      id: "last-section",
    },
  ];

  return (
    <>
      <Head>
        <title>OR Studio | Home</title>
      </Head>

      {isPreloaderVisible && <MainPreloader />}

      {isPageReady && (
        <>
          <div className={styles.homePage}>
            {sections.map((section, index) => (
              <SectionWrapper key={section.id} id={section.id}>
                <ScrollSectionNavigation
                  sections={sections.map((section) => section.id)}
                />
                <div
                  data-section-id={section.id}
                  className={styles.sectionContainer}>
                  {section.component}
                </div>
                <DirectionalButton
                  direction={index < sections.length - 1 ? "down" : "up"}
                  width={isMobile ? 2.3 : 3}
                  height={isMobile ? 2.3 : 3}
                  onClick={() =>
                    handleScroll(sections[(index + 1) % sections.length]?.id)
                  }
                />
              </SectionWrapper>
            ))}
          </div>
        </>
      )}
    </>
  );
}

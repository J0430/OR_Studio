import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { usePreloader } from "@contexts/MainPreloaderContext";
import { useNav } from "@contexts/NavContext";
import { fetchData } from "@utils/api";
import Head from "next/head";
import dynamic from "next/dynamic";
import DirectionalButton from "@components/common/DirectionalButton/DirectionalButton";
import SectionWrapper from "@components/common/SectionWrapper/SectionWrapper";
import MainPreloader from "@components/preloaders/MainPreloader/mainpreloader/MainPreloader";
import styles from "@styles/pages/home.module.scss";

// ✅ Dynamic imports for sections
const LandingPage = dynamic(
  () => import("@components/sections/home/LandingPage/LandingPage")
);
const AboutBanner = dynamic(
  () => import("@components/sections/home/AboutBanner/AboutBanner")
);
const ProjectBanner = dynamic(
  () => import("@components/sections/home/ProjectBanner/ProjectBanner")
);

// ✅ Fetching data at build time
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

  // ✅ Wait until preloader ends, then unlock page
  useEffect(() => {
    if (!isPreloaderVisible) {
      const timeout = setTimeout(() => setIsPageReady(true), 600); // Smooth transition delay
      return () => clearTimeout(timeout);
    }
  }, [isPreloaderVisible]);

  // ✅ Smooth scroll to target ID
  const handleScroll = useCallback((targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // ✅ Extract data for banners
  const { LandingPictures, EvenYehuda, Hevron8PenthouseRooftop, City69 } =
    homeData.projects || {};

  // ✅ Sections to render
  const sections = [
    {
      component: <LandingPage images={LandingPictures?.images} />,
      id: "landingPage",
    },
    { component: <AboutBanner />, id: "aboutBanner" },
    {
      component: <ProjectBanner images={EvenYehuda?.images} />,
      id: "evenYehuda",
    },
    {
      component: <ProjectBanner images={Hevron8PenthouseRooftop?.images} />,
      id: "hevron8",
    },
    {
      component: <ProjectBanner images={City69?.images} />,
      id: "last-section",
    },
  ];

  return (
    <>
      <Head>
        <title>OR Studio | Home</title>
      </Head>

      {/* ✅ Preloader */}
      {isPreloaderVisible && <MainPreloader />}

      {/* ✅ Page content */}
      {isPageReady && (
        <div className={styles.homePage}>
          {sections.map((section, index) => (
            <SectionWrapper key={section.id} id={section.id}>
              <div className={styles.sectionContainer}>
                {section.component}
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
      )}
    </>
  );
}

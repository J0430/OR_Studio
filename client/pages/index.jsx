import { useCallback, useEffect, useState } from "react";
import { preloadImages } from "@utils/imageUtils";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { usePreloader } from "@contexts/MainPreloaderContext";
import { useNav } from "@contexts/NavContext";
import MainPreloader from "@components/preloaders/MainPreloader/mainpreloader/MainPreloader";
import { fetchData } from "@utils/api";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "@styles/pages/home.module.scss";

// Dynamic imports
const LandingPage = dynamic(
  () => import("@components/sections/homeSections//LandingPage/LandingPage")
);
const AboutBanner = dynamic(
  () => import("@components/sections/homeSections/AboutBanner/AboutBanner")
);
const ProjectBanner = dynamic(
  () => import("@components/sections/homeSections/ProjectBanner/ProjectBanner")
);
const DirectionalButton = dynamic(
  () => import("@components/common/DirectionalButton/DirectionalButton"),
  { ssr: false }
);

// ✅ getStaticProps - Runs on server during build
export const getStaticProps = async () => {
  try {
    const homeData = await fetchData("home");

    return {
      props: {
        homeData,
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error.message);
    return {
      props: {
        home: { projects: {}, frontImages: [], category: "" },
      },
    };
  }
};

export default function Home({ homeData }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { isNavOpen } = useNav();
  const { isPreloaderVisible, onImageLoad } = usePreloader();
  const [isPageReady, setIsPageReady] = useState(false);

  // Delayed transition to ensure smooth entry
  useEffect(() => {
    if (!isPreloaderVisible) {
      setTimeout(() => setIsPageReady(true), 600); // Short delay for smooth transition
    }
  }, [isPreloaderVisible]);

  const handleScroll = useCallback((targetId) => {
    if (!targetId) return;

    if (typeof window !== "undefined") {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  // Extracting sections data
  const { LandingPictures, EvenYehuda, Hevron8PenthouseRooftop, City69 } =
    homeData.projects || {};

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
        <title>OR Studio - Home</title>
      </Head>

      {/* ✅ Smooth transition from Preloader */}
      <AnimatePresence mode="wait">
        {isPreloaderVisible && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.1, ease: "easeOut" },
            }}>
            <MainPreloader />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isPageReady && (
          <motion.div
            key="homePage"
            className={styles.homePage}
            initial={{ opacity: 0.5, scale: 1.1 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0.5, scale: 0.9, transition: { duration: 0.1 } }}
            transition={{ duration: 0.3, ease: "easeOut" }}>
            {sections.map((section, index) => (
              <div
                key={section.id}
                id={section.id}
                className={styles.sectionContainer}>
                {section.component}

                {!isNavOpen && !isPreloaderVisible && (
                  <DirectionalButton
                    direction={index < sections.length - 1 ? "down" : "up"}
                    width={isMobile ? 2.3 : 3}
                    height={isMobile ? 2.3 : 3}
                    onClick={() =>
                      handleScroll(sections[(index + 1) % sections.length]?.id)
                    }
                  />
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

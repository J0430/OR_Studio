import { useCallback, useEffect, useState } from "react";
import { preloadImages } from "@utils/imageUtils";
import { motion } from "framer-motion";
import { usePreloader } from "@contexts/MainPreloaderContext";
import { useNav } from "@contexts/NavContext";
import MainPreloader from "@components/preloaders/MainPreloader/mainpreloader/MainPreloader";
import { fetchData } from "@utils/api";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "@styles/pages/home.module.scss";

// Dynamic imports

const LandingPage = dynamic(
  () => import("@components/sections/home/LandingPage/LandingPage")
);
const AboutBanner = dynamic(
  () => import("@components/sections/home/AboutBanner/AboutBanner")
);
const ProjectBanner = dynamic(
  () => import("@components/sections/home/ProjectBanner/ProjectBanner")
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
  const { isNavOpen } = useNav();
  const { isPreloaderVisible, onImageLoad } = usePreloader();
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    if (!isPreloaderVisible) {
      setIsPageReady(true);
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

  // Continue rendering
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
      {isPreloaderVisible && <MainPreloader />}
      <motion.div
        key="homePage"
        className={styles.homePage}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.6 } }}
        transition={{ duration: 0.6, ease: "easeOut" }}>
        {sections.map((section, index) => (
          <div
            key={section.id}
            id={section.id}
            className={styles.sectionContainer}>
            {section.component}

            {!isNavOpen && !isPreloaderVisible && (
              <DirectionalButton
                direction={index < sections.length - 1 ? "down" : "up"}
                width={3}
                height={3}
                onClick={() =>
                  handleScroll(sections[(index + 1) % sections.length]?.id)
                }
              />
            )}
          </div>
        ))}
      </motion.div>
    </>
  );
}

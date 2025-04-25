import { useCallback, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { usePreloader, PreloaderProvider } from "@contexts/HomeContext";
import { loadDynamicImports } from "@utils/loadDynamicImports";
import { useMediaQuery } from "react-responsive";
import { fetchData } from "@utils/api";
import Head from "next/head";
import styles from "@styles/pages/home.module.scss";

const { DirectionalButton, SectionWrapper } = loadDynamicImports("common", [
  "DirectionalButton",
  "SectionWrapper",
]);

const { MainPreloader } = loadDynamicImports("preloaders", ["MainPreloader"]);

const sectionsConfig = [
  { component: "LandingPageSection", projectKey: "LandingPictures" },
  { component: "AboutBanner", projectKey: "LandingPictures" },
  { component: "WorkBanner", projectKey: "EvenYehuda" },
  { component: "WorkBanner", projectKey: "Hevron8PenthouseRooftop" },
  { component: "WorkBanner", projectKey: "City69" },
];

const dynamicComponents = loadDynamicImports("sections/home", [
  ...new Set(sectionsConfig.map((s) => s.component)),
]);

function HomeContent({ data }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { isPreloaderVisible } = usePreloader;
  const sections = useMemo(
    () =>
      sectionsConfig.map(({ component, projectKey }, index) => ({
        id: `section-${index}`,
        component: dynamicComponents[component],
        props: projectKey
          ? { images: data?.projects[projectKey]?.images || [] }
          : {},
      })),
    [data]
  );

  const handleScroll = useCallback((targetId) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Head>
        <title>OR Studio | Home</title>
      </Head>

      <MainPreloader />

      {!isPreloaderVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }} // set final opacity to 0.4
          transition={{ duration: 3, ease: "easeInOut" }}
          className={styles.homePage}>
          {sections.map(({ component: SectionComponent, props, id }, index) => (
            <SectionWrapper key={id} id={id}>
              <div data-section-id={id} className={styles.sectionContainer}>
                <SectionComponent {...props} />
              </div>
              <DirectionalButton
                direction={index < sections.length - 1 ? "down" : "up"}
                width={isMobile ? 2.3 : 3}
                height={isMobile ? 2.3 : 3}
                onClick={() =>
                  handleScroll(sections[(index + 1) % sections.length].id)
                }
              />
            </SectionWrapper>
          ))}
        </motion.div>
      )}
    </>
  );
}

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

export default function HomePage({ homeData }) {
  return (
    <PreloaderProvider>
      <HomeContent data={homeData} />
    </PreloaderProvider>
  );
}

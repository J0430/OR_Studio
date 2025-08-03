// pages/index.tsx (HomePage)
import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { loadDynamicImports } from "utils/loadDynamicImports";
import {
  useWorksPreloader,
  WorksPreloaderProvider,
} from "@contexts/WorksPreloaderContext";

import { homeData } from "@public/data";
import Head from "next/head";
import styles from "@styles/pages/home.module.scss";

const { IconButton, SectionWrapper } = loadDynamicImports("common", [
  "IconButton",
  "SectionWrapper",
]);
const { WorksPreloader } = loadDynamicImports("preloaders", ["WorksPreloader"]);
console.log("WorksPreloader:", WorksPreloader);
const sectionsConfig = [
  { component: "LandingPageSection", projectKey: "LandingPictures" },
  { component: "AboutBanner" },
  { component: "WorkBanner", projectKey: "EvenYehuda" },
  { component: "WorkBanner", projectKey: "Hevron" },
  { component: "WorkBanner", projectKey: "City69" },
];

const dynamicComponents = loadDynamicImports("sections/home", [
  ...new Set(sectionsConfig.map((s) => s.component)),
]);

function HomeContent() {
  const { isDevice, isPreloaderVisible } = useWorksPreloader();

  const sections = useMemo(
    () =>
      sectionsConfig.map(({ component, projectKey }, index) => ({
        id: `section-${index}`,
        component: dynamicComponents[component],
        props: projectKey
          ? { images: homeData.projects[projectKey]?.images || [] }
          : {},
      })),
    []
  );

  const handleScroll = useCallback((targetId) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Head>
        <title>OR Studio | Home</title>
      </Head>

      {isPreloaderVisible && <WorksPreloader />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className={styles.homePage}>
        {sections.map(({ component: SectionComponent, props, id }, index) => (
          <SectionWrapper key={id} id={id}>
            <div data-section-id={id} className={styles.sectionContainer}>
              <SectionComponent {...props} />
            </div>

            {/* ✅ Scroll Button using IconButton */}
            <IconButton
              direction={index < sections.length - 1 ? "down" : "up"}
              width={isDevice ? 2.3 : 3}
              height={isDevice ? 2.3 : 3}
              onClick={() =>
                handleScroll(sections[(index + 1) % sections.length].id)
              }
            />
          </SectionWrapper>
        ))}
      </motion.div>
    </>
  );
}

export default function HomePage() {
  return (
    <WorksPreloaderProvider>
      <HomeContent />
    </WorksPreloaderProvider>
  );
}

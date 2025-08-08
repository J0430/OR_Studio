// pages/index.tsx (HomePage)
import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { loadDynamicImports } from "utils/loadDynamicImports";

import { homeData } from "@public/data";
import Head from "next/head";
import styles from "@styles/pages/home.module.scss";

const { IconButton, SectionWrapper } = loadDynamicImports("common", [
  "IconButton",
  "SectionWrapper",
]);

// Step 1: Add visible version first, original (hidden) at end
const sectionsConfig = [
  { component: "LandingPageSection", projectKey: "LandingPictures", id: "visible-duplicate" }, // ✅ visible
  { component: "AboutBanner" },
  { component: "WorkBanner", projectKey: "EvenYehuda" },
  { component: "WorkBanner", projectKey: "Hevron" },
  { component: "WorkBanner", projectKey: "City69" },
  { component: "LandingPageSection", projectKey: "LandingPictures", id: "original" }, // 🚫 hidden
];

const dynamicComponents = loadDynamicImports("sections/home", [
  ...new Set(sectionsConfig.map((s) => s.component)),
]);

function HomePage() {
  const sections = useMemo(() => {
    return sectionsConfig.map(({ component, projectKey, id }, index) => ({
      id: id || `section-${index}`,
      component: dynamicComponents[component],
      props: projectKey
        ? { images: homeData.projects[projectKey]?.images || [] }
        : {},
      isHidden: id === "original", // 👈 flag original
    }));
  }, []);

  const handleScroll = useCallback((targetId) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Head>
        <title>OR Studio | Home</title>
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className={styles.homePage}
      >
        {sections.map(({ component: SectionComponent, props, id, isHidden }, index) => (
          <SectionWrapper key={id} id={id}>
            <div
              data-section-id={id}
              className={`${styles.sectionContainer} ${isHidden ? styles.hiddenSection : ""}`}
              aria-hidden={isHidden ? "true" : "false"}
            >
              <SectionComponent {...props} />
            </div>

            {!isHidden && (
              <IconButton
                direction={index < sections.length - 1 ? "down" : "up"}
                width={3}
                height={3}
                onClick={() =>
                  handleScroll(sections[(index + 1) % sections.length].id)
                }
              />
            )}
          </SectionWrapper>
        ))}
      </motion.div>
    </>
  );
}

export default HomePage;
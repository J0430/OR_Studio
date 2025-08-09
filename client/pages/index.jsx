import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { dynamicImportComponents } from "utils/dynamicImportComponents";

import { homeData } from "@public/data";
import Head from "next/head";
import styles from "@styles/pages/home.module.scss";

const { IconButton, SectionWrapper } = dynamicImportComponents("common", [
  "IconButton",
  "SectionWrapper",
]);
const { LogoPreloader } = dynamicImportComponents("preloaders", [
  "LogoPreloader",
]);

const sectionsConfig = [
  { component: "LandingPageSection", projectKey: "LandingPictures" },
  { component: "AboutBanner" },
  { component: "WorkBanner", projectKey: "EvenYehuda" },
  { component: "WorkBanner", projectKey: "Hevron" },
  { component: "WorkBanner", projectKey: "City69" },
];

const dynamicComponents = dynamicImportComponents("sections/home", [
  ...new Set(sectionsConfig.map((s) => s.component)),
]);

function HomePage() {
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

      <LogoPreloader duration={1.5} />
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
              width={3}
              height={3}
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
export default HomePage;

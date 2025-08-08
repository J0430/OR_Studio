// pages/index.tsx (HomePage)
import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { loadDynamicImports } from "utils/loadDynamicImports";

import { homeData } from "@public/data";
import styles from "@styles/pages/home.module.scss";
import LogoPreloader from "@components/preloaders/LogoPreloader/LogoPreloader";

const { IconButton, SectionWrapper } = loadDynamicImports("common", [
  "IconButton",
  "SectionWrapper",
]);

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

function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);

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

  const handleScroll = useCallback((targetId: string) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Head>
        <title>OR Studio | Home</title>
      </Head>

      <LogoPreloader duration={1.5} onFinish={() => setPreloaderDone(true)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className={styles.homePage}
      >
        {sections.map(({ component: SectionComponent, props, id }, index) => (
          <SectionWrapper key={id} id={id}>
            <div data-section-id={id} className={styles.sectionContainer}>
              <SectionComponent
                {...(id === "section-0"
                  ? { ...props, preloaderDone } // ✅ only LandingPageSection
                  : props)}
              />
            </div>

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
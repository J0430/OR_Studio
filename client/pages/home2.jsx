import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";

import styles from "@styles/pages/home.module.scss";
import { loadDynamicImports } from "utils/loadDynamicImports";
import { homeData } from "@public/data";
import LogoPreloader from "@components/preloaders/LogoPreloader/LogoPreloader";

// ✅ Extract homeImages
const homeImages =
  homeData.projects?.LandingPictures?.images?.map((img) => img.src) || [];

// ✅ Load other dynamic components
const { IconButton, SectionWrapper } = loadDynamicImports("common", [
  "IconButton",
  "SectionWrapper",
]);

const dynamicComponents = loadDynamicImports("sections/home", [
  "AboutBanner",
  "WorkBanner",
]);

// ✅ Inline LandingSection instead of dynamic import
const LandingSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  const updateImageIndex = useCallback(() => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % homeImages.length
    );
  }, []);

  useEffect(() => {
    if (homeImages.length > 0) {
      intervalRef.current = setInterval(updateImageIndex, 4000);
    }

    return () => clearInterval(intervalRef.current);
  }, [updateImageIndex]);

  return (
    <motion.section className={styles.bannerWrapper}>
      <AnimatePresence mode="wait">
        {homeImages.length > 0 && (
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.bannerImageWrapper}
          >
            <Image
              src={homeImages[currentImageIndex]}
              alt={`Background Image ${currentImageIndex + 1}`}
              fill
              priority={currentImageIndex === 0}
              style={{ objectFit: "cover" }}
              className={styles.bannerImage}
              aria-label={`Background image number ${currentImageIndex + 1}`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className={styles.bannerTitleWrapper}>
        <motion.div
          className={styles.titleLineWrapper}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className={styles.bannerTitle}
        >
          DESIGN DIFFERENT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
          className={styles.bannerSubtitle}
        >
          Architectural animation and visualization digital production by OR Studio
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

// ✅ Set up the section config, injecting the inlined LandingSection directly
const sectionsConfig = [
  { component: LandingSection }, // ← Not a string, but a component reference
  { component: dynamicComponents["AboutBanner"] },
  { component: dynamicComponents["WorkBanner"], projectKey: "EvenYehuda" },
  { component: dynamicComponents["WorkBanner"], projectKey: "Hevron" },
  { component: dynamicComponents["WorkBanner"], projectKey: "City69" },
];

function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const sections = useMemo(
    () =>
      sectionsConfig.map(({ component, projectKey }, index) => ({
        id: `section-${index}`,
        component,
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
                  ? { ...props, preloaderDone }
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
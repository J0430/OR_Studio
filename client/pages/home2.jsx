



import LogoPreloader from "@components/preloaders/LogoPreloader/LogoPreloader";
import Head from "next/head";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "@styles/pages/home.module.scss";

// ✅ Import homeData and extract LandingPictures
import { homeData } from "@public/data";

const homeImages =
  homeData.projects?.LandingPictures?.images?.map((img) => img.src) || [];

const LandingPage = () => {
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

  return (   <>
      <Head>
        <title>OR Studio | Home</title>
      </Head>

      <LogoPreloader duration={1.5} onFinish={() => setPreloaderDone(true)} />

      
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
</>
  );
};

export default LandingPage;


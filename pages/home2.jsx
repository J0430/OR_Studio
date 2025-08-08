

import React from "react";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import LogoPreloader from "@components/preloaders/LogoPreloader/LogoPreloader";
import styles from "@styles/pages/home.module.scss";
import { homeData } from "@public/data";

const homeImages =
  homeData.projects?.LandingPictures?.images?.map((img) => img.src) || [];

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>OR Studio | Landing</title>
      </Head>

      {/* ✅ Always visible preloader */}
      <LogoPreloader duration={2.5} />

      {/* ✅ Static content shown at the same time */}
      <motion.section className={styles.bannerWrapper}>
        <AnimatePresence mode="wait">
          {homeImages.length > 0 && (
            <motion.div
              key={homeImages[0]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={styles.bannerImageWrapper}
            >
              <Image
                src={homeImages[0]}
                alt="Background Image"
                fill
                priority
                style={{ objectFit: "cover" }}
                className={styles.bannerImage}
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
"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "../home/LandingPage.module.scss";

const LandingPage = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);
      return () => clearInterval(intervalId);
    }
  }, [images]);

  return (
    <motion.div className={styles.bannerWrapper}>
      {/* Image Transition */}
      <AnimatePresence>
        {images?.length > 0 && (
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className={styles.bannerImageWrapper}>
            <Image
              src={images[currentImageIndex]}
              alt={`Background Image ${currentImageIndex + 1}`}
              layout="fill"
              objectFit="cover"
              priority={true}
              className={styles.bannerImage}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Animation */}
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
          className={styles.bannerTitle}>
          DESIGN DIFFERENT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
          className={styles.bannerSubtitle}>
          Architectural animation and visualization digital production by OR
          studio
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;

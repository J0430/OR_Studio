"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import styles from "./ProjectBanner.module.scss";
import DirectionalButton from "../common/DirectionalButton";

const wrap = (min, max, val) => {
  if (val > max) return min;
  if (val < min) return max;
  return val;
};

const imageVariants = {
  enter: (direction) => ({
    zIndex: 1,
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const ProjectBanner = ({ images, nextSectionId }) => {
  const [[page, direction], setPage] = useState([0, 0]); // Page and direction state
  const imageIndex = wrap(0, images?.length - 1, page);
  const transitionTime = 4000; // Duration for each slide
  const [autoplayInterval, setAutoplayInterval] = useState(null); // Track the interval ID

  const [ref, inView] = useInView({
    threshold: 0.5, // Adjust as needed
  });

  const nextPage = () => {
    setPage(([currentPage]) => {
      const newPage = (currentPage + 1) % images?.length; // Loop back to the first image
      return [newPage, 1];
    });
  };

  useEffect(() => {
    if (inView) {
      const interval = setInterval(nextPage, transitionTime);
      setAutoplayInterval(interval);
    } else if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }

    return () => clearInterval(autoplayInterval);
  }, [inView, images?.length, transitionTime]);

  const handleDotClick = (index) => {
    setPage([index, index > page ? 1 : -1]); // Determine direction based on index
    if (autoplayInterval) {
      clearInterval(autoplayInterval); // Stop autoplay on manual navigation
    }
  };

  return (
    <motion.div ref={ref} className={styles.carouselContainer}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className={styles.carouselImage}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 200, damping: 150 },
            opacity: { duration: 0.8 },
          }}>
          {images?.length > 0 && (
            <Image
              alt={`Project Image ${imageIndex + 1}`}
              src={images[imageIndex]} // Fix array indexing
              fill
              style={{ objectFit: "cover" }}
              priority={true}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className={styles.carouselDots}>
        {images?.map((_, idx) => (
          <div
            key={idx}
            className={`${styles.carouselDot} ${
              idx === imageIndex ? styles.active : ""
            }`}
            onClick={() => handleDotClick(idx)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectBanner;

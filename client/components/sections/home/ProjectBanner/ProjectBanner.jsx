"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import styles from "./ProjectBanner.module.scss";

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

const ProjectBanner = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]); // Page and direction state
  const imageIndex = wrap(0, images?.length - 1, page);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true); // Track autoplay state
  const [initialView, setInitialView] = useState(true); // Track if the user is entering for the first time
  const [transitionTime, setTransitionTime] = useState(1500); // Start with 1000ms

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const nextPage = () => {
    setPage(([currentPage]) => {
      const newPage = (currentPage + 1) % images?.length;
      return [newPage, 1];
    });
    setInitialView(false); // Mark that the user has seen the first slide
    setTransitionTime(4000); // Change transition time to 4000ms after the first slide
  };

  useEffect(() => {
    let interval;
    if (inView && isAutoplayActive) {
      interval = setInterval(nextPage, transitionTime);
    }
    return () => clearInterval(interval);
  }, [inView, isAutoplayActive, images?.length, transitionTime]);

  const handleDotClick = (index) => {
    setPage([index, index > page ? 1 : -1]);
    setIsAutoplayActive(false);
    setTransitionTime(4000); // Ensure transition time stays at 4000ms when manually clicked
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
              src={images[imageIndex]}
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

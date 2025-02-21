"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "./ProjectBanner.module.scss";

const ProjectBanner = ({ images }) => {
  console.log(images);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  const updateImageIndex = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images?.length]);

  // Start autoplay when the component is in view
  useEffect(() => {
    if (images?.length > 0) {
      intervalRef.current = setInterval(updateImageIndex, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [images, updateImageIndex]);

  return (
    <motion.div className={styles.carouselContainer}>
      <AnimatePresence mode="wait">
        {images?.length > 0 && (
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.7 }}
            className={styles.carouselImage}>
            <Image
              src={images[currentImageIndex]}
              alt={`Project Image ${currentImageIndex + 1}`}
              fill
              priority={currentImageIndex === 0}
              style={{ objectFit: "cover" }}
              className={styles.bannerImage}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Dots */}
      <motion.div className={styles.carouselDots}>
        {images?.map((_, idx) => (
          <motion.div
            key={idx}
            className={`${styles.carouselDot} ${
              idx === currentImageIndex ? styles.active : ""
            }`}
            onClick={() => setCurrentImageIndex(idx)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProjectBanner;

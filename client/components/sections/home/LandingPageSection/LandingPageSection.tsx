import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Imagen from "next/image";
import styles from "./LandingPageSection.module.scss";
import type { LandingPageSectionProps } from "./LandingPageSection.types";

const LandingPageSection: React.FC<LandingPageSectionProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ============ LOG ON MOUNT ============
  useEffect(() => {
    console.log("[LandingPageSection] Mounted with", images.length, "images");
    return () => {
      console.log("[LandingPageSection] Unmounted");
    };
  }, []);

  // ============ IMAGE ROTATION ============
  const updateImageIndex = useCallback(() => {
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % images.length;
      console.log("[Image Change] Moving to index:", nextIndex);
      return nextIndex;
    });
  }, [images.length]);

  useEffect(() => {
    if (images.length > 0) {
      intervalRef.current = setInterval(updateImageIndex, 4000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images, updateImageIndex]);

  // ============ FIRST IMAGE LOAD ============
  const handleImageLoad = () => {
    console.log("[Image Load] Image", currentImageIndex, "loaded");
    if (!firstImageLoaded) {
      console.log("[Text Trigger] Showing title and subtitle");
      setFirstImageLoaded(true);
    }
  };

  return (
    <motion.section className={styles.bannerWrapper}>
      {/* === BACKGROUND IMAGE === */}
      <AnimatePresence mode="wait">
        {images.length > 0 && (
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.bannerImageWrapper}>
            <Imagen
              src={images[currentImageIndex]}
              alt={`Background Image ${currentImageIndex + 1}`}
              fill
              priority={currentImageIndex === 0}
              style={{ objectFit: "cover" }}
              className={styles.bannerImage}
              onLoad={handleImageLoad}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* === TEXT BLOCK === */}
      {firstImageLoaded && (
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
            Studio
          </motion.p>
        </motion.div>
      )}
    </motion.section>
  );
};

export default LandingPageSection;

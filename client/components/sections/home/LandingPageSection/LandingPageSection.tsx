import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "./LandingPageSection.module.scss";

export interface LandingPageSectionProps {
  images: string[];
}

const LandingPageSection: React.FC<LandingPageSectionProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cycle through images every 4 seconds
  const updateImageIndex = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length > 0) {
      intervalRef.current = setInterval(updateImageIndex, 4000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images, updateImageIndex]);

  return (
    <motion.section className={styles.bannerWrapper}>
      {/* Background Image Transition */}
      <AnimatePresence mode="wait">
        {images.length > 0 && (
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.bannerImageWrapper}>
            <Image
              src={images[currentImageIndex]}
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

      {/* Text & Animated Title */}
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
    </motion.section>
  );
};

export default LandingPageSection;
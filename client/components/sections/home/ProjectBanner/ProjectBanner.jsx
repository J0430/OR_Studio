import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "./ProjectBanner.module.scss";

const ProjectBanner = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  const updateImageIndex = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images?.length]);

  useEffect(() => {
    if (images?.length > 0) {
      intervalRef.current = setInterval(updateImageIndex, 3000); // ⏩ Faster transitions (3s)
    }
    return () => clearInterval(intervalRef.current);
  }, [images, updateImageIndex]);

  return (
    <motion.div className={styles.carouselContainer}>
      <AnimatePresence mode="wait">
        {images?.length > 0 && (
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0.3, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.3, ease: "easeOut" }} // ⏩ Faster fade transitions
            className={styles.carouselImage}>
            <Image
              src={images[currentImageIndex]}
              alt={`Project Image ${currentImageIndex + 1}`}
              fill
              priority={currentImageIndex === 0}
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
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.15 }} // ⏩ Faster hover feedback
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProjectBanner;

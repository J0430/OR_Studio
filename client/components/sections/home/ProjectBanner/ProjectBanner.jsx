import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "./ProjectBanner.module.scss";

const ProjectBanner = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const updateImageIndex = useCallback(() => {
    if (!isPaused) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  }, [images?.length, isPaused]);

  const pauseAutoPlay = () => {
    setIsPaused(true);
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);

    // Restart autoplay after 5s of inactivity
    timeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      pauseAutoPlay();
    } else if (event.key === "ArrowLeft") {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      pauseAutoPlay();
    }
  };

  useEffect(() => {
    if (images?.length > 0 && !isPaused) {
      intervalRef.current = setInterval(updateImageIndex, 1500);
    }

    return () => clearInterval(intervalRef.current);
  }, [images, updateImageIndex, isPaused]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.div className={styles.carouselContainer}>
      <AnimatePresence mode="wait">
        {images?.length > 0 && (
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
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
            onClick={() => {
              setCurrentImageIndex(idx);
              pauseAutoPlay();
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProjectBanner;

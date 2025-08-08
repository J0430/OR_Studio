import { useState, useEffect, useRef, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence, motion } from "framer-motion";
import { loadDynamicImports } from "utils/loadDynamicImports";
import BannerImage from "client/components/common/BannerImage/BannerImage";
import ProgressBar from "client/components/common/ProgressBar/ProgressBar";
import styles from "../WorkBanner/WorkBanner.module.scss";

const { IconButton } = loadDynamicImports("common", ["IconButton"]);
const WorkBanner = ({ images = [] }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const duration = 5000;

  const updateImageIndex = useCallback(() => {
    if (!isPaused) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  }, [images.length, isPaused]);

  const stopAutoPlay = () => {
    setIsPaused(true);
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  const handleProgressClick = (index) => {
    setCurrentImageIndex(index);
    stopAutoPlay();
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();

        if (event.key === "ArrowRight") {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          stopAutoPlay();
        } else if (event.key === "ArrowLeft") {
          setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
          );
          stopAutoPlay();
        }
      }
    },
    [images.length]
  );

  useEffect(() => {
    if (images.length > 0 && !isPaused) {
      intervalRef.current = setInterval(updateImageIndex, duration);
    }
    return () => clearInterval(intervalRef.current);
  }, [images, updateImageIndex, isPaused, currentImageIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > 50) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      stopAutoPlay();
    } else if (deltaX < -50) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      stopAutoPlay();
    }
  };

  return (
    <motion.div
      className={styles.carouselContainer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}>
      <AnimatePresence mode="wait">
        {images.length > 0 && (
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0.5, filter: "blur(200px) scale(1.1)" }}
            animate={{ opacity: 1, filter: "blur(100px) scale(1)" }}
            exit={{ opacity: 0.5, filter: "blur(200px) scale(1.1)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.imageWrapper}>
            {/* <DirectionalButton */}
            <IconButton
              direction="left"
              width={isMobile ? 2.3 : 3}
              height={isMobile ? 2.3 : 3}
              onClick={() => {
                setCurrentImageIndex(
                  (prevIndex) => (prevIndex - 1 + images.length) % images.length
                );
                stopAutoPlay();
              }}
            />
            <BannerImage src={images[currentImageIndex]} />
            {/* <DirectionalButton */}
            <IconButton
              direction="right"
              width={isMobile ? 2.3 : 3}
              height={isMobile ? 2.3 : 3}
              onClick={() => {
                setCurrentImageIndex(
                  (prevIndex) => (prevIndex + 1) % images.length
                );
                stopAutoPlay();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.progressContainer}>
        {" "}
        {images.map((_, index) => (
          <ProgressBar
            key={index}
            isActive={index === currentImageIndex}
            duration={5500}
            onClick={() => handleProgressClick(index)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default WorkBanner;

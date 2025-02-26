import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BannerImage from "@components/common/BannerImage/BannerImage";
import ProgressBar from "@components/common/ProgressBar/ProgressBar";
import DirectionalButton from "@components/common/DirectionalButton/DirectionalButton";
import styles from "../ProjectBanner/ProjectBanner.module.scss";

const ProjectBanner = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const duration = 4000; // 4s per slide

  // Updates image index for infinite loop
  const updateImageIndex = useCallback(() => {
    if (!isPaused) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  }, [images.length, isPaused]);

  // Stops autoplay when interacting
  const stopAutoPlay = () => {
    setIsPaused(true);
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);

    // Resume autoplay after 5s of inactivity
    timeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4000);
  };

  // Navigate to specific image when clicking on progress bar
  const handleProgressClick = (index) => {
    setCurrentImageIndex(index);
    stopAutoPlay();
  };

  // Keyboard Navigation
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowRight") {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        stopAutoPlay();
      } else if (event.key === "ArrowLeft") {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
        stopAutoPlay();
      }
    },
    [images.length]
  );

  useEffect(() => {
    if (images.length > 0 && !isPaused) {
      intervalRef.current = setInterval(updateImageIndex, duration);
    }

    return () => clearInterval(intervalRef.current);
  }, [images, updateImageIndex, isPaused]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // SWIPE GESTURE DETECTION
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
      {/* Image Display */}
      <AnimatePresence mode="wait">
        {images.length > 0 && (
          <BannerImage
            key={currentImageIndex}
            image={images[currentImageIndex]}
          />
        )}
      </AnimatePresence>

      {/* Static Progress Bar with Click Navigation */}
      <ProgressBar
        currentIndex={currentImageIndex}
        totalImages={images.length}
        duration={duration}
        onSelect={handleProgressClick}
      />

      {/* Navigation Buttons */}
      <DirectionalButton
        direction="left"
        width={3}
        height={3}
        onClick={() => {
          setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
          );
          stopAutoPlay();
        }}
      />
      <DirectionalButton
        direction="right"
        width={3}
        height={3}
        onClick={() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          stopAutoPlay();
        }}
      />
    </motion.div>
  );
};

export default ProjectBanner;

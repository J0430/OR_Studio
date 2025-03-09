import { useState, useEffect, useRef, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence, motion } from "framer-motion";
import BannerImage from "@components/common/BannerImage/BannerImage";
import ProgressBar from "@components/common/ProgressBar/ProgressBar";
import DirectionalButton from "@components/common/DirectionalButton/DirectionalButton";
import styles from "../ProjectBanner/ProjectBanner.module.scss";

const ProjectBanner = ({ images }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const duration = 5000; // Transition time per image

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
    }, 5000);
  };

  // Navigate to specific image when clicking on progress bar
  const handleProgressClick = (index) => {
    setCurrentImageIndex(index);
    stopAutoPlay();
  };

  // Keyboard Navigation
  // Keyboard Navigation Fix
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault(); // ✅ Prevent browser default behavior
        event.stopPropagation(); // ✅ Stop event bubbling to parent sections

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
  }, [images, updateImageIndex, isPaused, currentImageIndex]); // Ensure sync with current image index

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
      {/* Image Display with Smooth Blurred Transition */}
      <AnimatePresence mode="wait">
        {images.length > 0 && (
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0.5, filter: "blur(200px) scale(1.1)" }}
            animate={{ opacity: 1, filter: "blur(100px) scale(1)" }}
            exit={{ opacity: 0.5, filter: "blur(200px) scale(1.1)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth fade and blur transition
            className={styles.imageWrapper}>
            <DirectionalButton
              direction="left"
              width={isMobile ? 2 : 3}
              height={isMobile ? 2 : 3}
              onClick={() => {
                setCurrentImageIndex(
                  (prevIndex) => (prevIndex - 1 + images.length) % images.length
                );
                stopAutoPlay();
              }}
            />
            <BannerImage image={images[currentImageIndex]} />
            <DirectionalButton
              direction="right"
              width={isMobile ? 2 : 3}
              height={isMobile ? 2 : 3}
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

      {/* Mapped Progress Bars (Only Active One Animates) */}
      <div className={styles.progressContainer}>
        {images.map((_, index) => (
          <ProgressBar
            key={index}
            isActive={index === currentImageIndex}
            duration={duration}
            onClick={() => handleProgressClick(index)}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
    </motion.div>
  );
};

export default ProjectBanner;

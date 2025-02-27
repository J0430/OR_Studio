import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "@hooks/useClickOuside";
import DirectionalButton from "@components/common/DirectionalButton/DirectionalButton";
import styles from "./ProjectsModal.module.scss";
import Image from "next/image";

function ProjectsModal({ selectedImage, project, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(1); // 1 for right, -1 for left
  const modalContentRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useClickOutside(modalContentRef, onClose);

  useEffect(() => {
    if (project && selectedImage) {
      const index = project.images?.indexOf(selectedImage);
      if (index !== -1) {
        setCurrentImageIndex(index);
      }
    }
  }, [project, selectedImage]);

  // Function to smoothly transition between images
  const handleNext = useCallback(() => {
    setSwipeDirection(1);
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  }, [project.images.length]);

  const handlePrevious = useCallback(() => {
    setSwipeDirection(-1);
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  }, [project.images.length]);

  // Function to handle keyboard navigation
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    },
    [handleNext, handlePrevious]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Function to handle swipe gestures for mobile/tablets
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > 50) {
      setSwipeDirection(1); // Swiping left (next image)
      handleNext();
    } else if (deltaX < -50) {
      setSwipeDirection(-1); // Swiping right (previous image)
      handlePrevious();
    }
  };

  return (
    <motion.div
      className={styles.modalContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className={styles.modalBackdrop} onClick={onClose} />

      <motion.div
        className={styles.modalContent}
        ref={modalContentRef}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close Modal">
          ✕
        </button>

        <motion.div className={styles.imageWrapper} layoutid={selectedImage}>
          <DirectionalButton
            direction="left"
            width={3}
            height={3}
            onClick={handlePrevious}
            className={styles.leftButton}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, x: swipeDirection * 50 }} // Adjust movement based on swipe direction
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: swipeDirection * -50 }} // Reverse movement for exit
              transition={{ duration: 0.3, ease: "easeInOut" }}>
              <Image
                src={project.images[currentImageIndex]}
                alt={`Project Image ${currentImageIndex + 1}`}
                className={styles.modalImage}
                width={900}
                height={700}
                style={{ objectFit: "cover" }}
                quality={80}
                priority
              />
            </motion.div>
          </AnimatePresence>

          <DirectionalButton
            direction="right"
            width={3}
            height={3}
            onClick={handleNext}
            className={styles.rightButton}
          />
        </motion.div>

        <div className={styles.thumbnailGallery}>
          {project.images.map((image, index) => (
            <div
              key={image || index}
              onClick={() => setCurrentImageIndex(index)}
              className={`${styles.thumbnailWrapper} ${index === currentImageIndex ? styles.activeThumbnail : ""}`}>
              <Image
                className={styles.thumbnailImage}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                layout="responsive"
                width={100}
                height={75}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectsModal;

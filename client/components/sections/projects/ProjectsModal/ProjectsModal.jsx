import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "@hooks/useClickOuside";
import DirectionalButton from "@components/common/DirectionalButton/DirectionalButton";
import styles from "./ProjectsModal.module.scss";
import Image from "next/image";

function ProjectsModal({ selectedImage, project, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalContentRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const thumbnailRef = useRef(null);

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
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  }, [project.images.length]);

  const handlePrevious = useCallback(() => {
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
      handleNext(); // Swipe left → next image
    } else if (deltaX < -50) {
      handlePrevious(); // Swipe right → previous image
    }
  };

  // Function to enable thumbnail scrolling on mobile
  const handleThumbnailScroll = (e) => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollLeft += e.deltaY;
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
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
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

        {/* Scrollable Thumbnail Gallery */}
        <div
          className={styles.thumbnailGallery}
          ref={thumbnailRef}
          onWheel={handleThumbnailScroll}>
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

//WorksModal.jsx

import { useState, useRef, useEffect, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useClickOutside from "@hooks/useClickOuside";

import styles from "./WorksModal.module.scss";

const { IconButton } = loadDynamicImports("common", ["IconButton"]);
const WorksModal = ({ selectedImage, project, onClose }) => {
  const isDevice = useMediaQuery({ maxWidth: 768 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(1);
  const [zoomed, setZoomed] = useState(false);

  const modalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const hasMultipleImages = project.images?.length > 1;

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    if (project && selectedImage) {
      const index = project.images.indexOf(selectedImage);
      if (index !== -1) setCurrentImageIndex(index);
    }
  }, [project, selectedImage]);

  const handleNext = useCallback(() => {
    setSwipeDirection(1);
    setZoomed(false);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  }, [project?.images?.length]);

  const handlePrevious = useCallback(() => {
    setSwipeDirection(-1);
    setZoomed(false);
    setCurrentImageIndex((prev) =>
      prev === 0 ? project?.images.length - 1 : prev - 1
    );
  }, [project?.images.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "Escape") onClose();
    },
    [handleNext, handlePrevious, onClose]
  );

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

    if (deltaX > 50) handleNext();
    else if (deltaX < -50) handlePrevious();
  };

  const handleBackdropClick = (e) => {
    const target = e.target;
    const isImage = target.tagName === "IMG";
    const isArrow = target.closest(`.${styles.direction}`);
    const isThumbnail = target.closest(`.${styles.thumbnailWrapper}`);

    if (!isImage && !isArrow && !isThumbnail) {
      onClose();
    }
  };

  const toggleZoom = () => {
    setZoomed((prev) => !prev);
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}>
        <motion.div
          className={styles.modalBackdrop}
          onClick={handleBackdropClick}
        />

        <motion.div
          ref={modalRef}
          className={styles.modalContent}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close Modal">
            ✕
          </button>
          <AnimatePresence mode="wait">
            <motion.div
              className={styles.imageWrapper}
              layoutId={selectedImage}>
              {hasMultipleImages && (
                <div className={`${styles.direction} ${styles.left}`}>
                  <IconButton
                    direction="left"
                    width={isDevice ? 1.5 : 3}
                    height={isDevice ? 1.5 : 3}
                    onClick={handlePrevious}
                  />
                </div>
              )}

              <motion.div
                key={project.images[currentImageIndex] || currentImageIndex}
                className={`${styles.imageTransitionWrapper} ${
                  zoomed ? styles.zoomed : ""
                }`}
                initial={{ opacity: 0, x: -swipeDirection * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: swipeDirection * 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onClick={toggleZoom}>
                <Image
                  src={project?.images[currentImageIndex]}
                  alt={`Project Image ${currentImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className={styles.modalImage}
                  style={{ objectFit: "contain", maxHeight: "100%" }}
                  quality={85}
                  priority
                />
              </motion.div>

              {hasMultipleImages && (
                <div className={`${styles.direction} ${styles.right}`}>
                  <IconButton
                    direction="right"
                    width={isDevice ? 1.5 : 3}
                    height={isDevice ? 1.5 : 3}
                    onClick={handleNext}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {hasMultipleImages && (
            <div className={styles.thumbnailContainer}>
              <div className={styles.thumbnailGallery}>
                {project.images.map((img, index) => (
                  <button
                    key={img || index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setZoomed(false);
                    }}
                    className={`${styles.thumbnailWrapper} ${
                      index === currentImageIndex ? styles.activeThumbnail : ""
                    }`}>
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      width={150}
                      height={125}
                      className={styles.thumbnailImage}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WorksModal;

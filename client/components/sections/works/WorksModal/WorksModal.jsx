import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useClickOutside from "@hooks/useClickOuside";
import DirectionalButton from "@components/common/DirectionalButton/DirectionalButton";
import styles from "./WorksModal.module.scss";

const WorksModal = ({ selectedImage, project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(1); // 1 = forward, -1 = backward
  const modalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const hasMultipleImages = project.images.length > 1;

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    if (project && selectedImage) {
      const index = project.images.indexOf(selectedImage);
      if (index !== -1) setCurrentImageIndex(index);
    }
  }, [project, selectedImage]);

  const handleNext = useCallback(() => {
    setSwipeDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  }, [project.images.length]);

  const handlePrevious = useCallback(() => {
    setSwipeDirection(-1);
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  }, [project.images.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
    },
    [handleNext, handlePrevious]
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

    if (deltaX > 50) {
      setSwipeDirection(1);
      handleNext();
    } else if (deltaX < -50) {
      setSwipeDirection(-1);
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
        ref={modalRef}
        className={styles.modalContent}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close Modal">
          ✕
        </button>

        <motion.div className={styles.imageWrapper} layoutId={selectedImage}>
          {hasMultipleImages && (
            <DirectionalButton
              direction="left"
              width={3}
              height={3}
              onClick={handlePrevious}
              className={styles.leftButton}
            />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, x: swipeDirection * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -swipeDirection * 100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}>
              <Image
                src={project.images[currentImageIndex]}
                alt={`Project Image ${currentImageIndex + 1}`}
                className={styles.modalImage}
                width={900}
                height={700}
                style={{ objectFit: "cover" }}
                quality={85}
                priority
              />
            </motion.div>
          </AnimatePresence>

          {hasMultipleImages && (
            <DirectionalButton
              direction="right"
              width={3}
              height={3}
              onClick={handleNext}
              className={styles.rightButton}
            />
          )}
        </motion.div>

        {hasMultipleImages && (
          <div
            className={styles.thumbnailGallery}
            role="navigation"
            aria-label="Image Thumbnails">
            {project.images.map((img, index) => (
              <button
                key={img || index}
                onClick={() => setCurrentImageIndex(index)}
                className={`${styles.thumbnailWrapper} ${index === currentImageIndex ? styles.activeThumbnail : ""}`}
                aria-label={`Go to image ${index + 1}`}>
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  width={100}
                  height={75}
                  // layout="responsive"
                  // className={styles.thumbnailImage}
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default WorksModal;

import { useState, useRef, useEffect, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useClickOutside from "@hooks/useClickOuside";
import DirectionalButton from "@components/common/DirectionalButton/DirectionalButton";
import styles from "./WorksModal.module.scss";

const WorksModal = ({ selectedImage, project, onClose }) => {
  const isDevice = useMediaQuery({ maxWidth: 768 });
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
    <AnimatePresence>
      <motion.div
        className={styles.modalContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}>
        <motion.div
          className={styles.modalBackdrop}
          onClick={onClose}
          initial={{ backdropFilter: "blur(0px)" }}
          animate={{ backdropFilter: "blur(10px)" }}
          exit={{ backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          ref={modalRef}
          className={styles.modalContent}
          layoutId={`work-item-${selectedImage}`}
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

          <div className={styles.imageWrapper}>
            {hasMultipleImages && (
              <DirectionalButton
                direction="left"
                width={isDevice ? 1.5 : 3}
                height={isDevice ? 1.5 : 3}
                onClick={handlePrevious}
                className={styles.leftButton}
              />
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, x: -swipeDirection * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: swipeDirection * 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}>
                <Image
                  src={project.images[currentImageIndex]}
                  alt={`Project Image ${currentImageIndex + 1}`}
                  className={styles.modalImage}
                  width={1200}
                  height={1100}
                  style={{ objectFit: "cover" }}
                  quality={85}
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {hasMultipleImages && (
              <DirectionalButton
                direction="right"
                width={isDevice ? 1.5 : 3}
                height={isDevice ? 1.5 : 3}
                onClick={handleNext}
                className={styles.rightButton}
              />
            )}
          </div>

          {hasMultipleImages && (
            <div className={styles.thumbnailGallery}>
              {project.images.map((img, index) => (
                <button
                  key={img || index}
                  onClick={() => setCurrentImageIndex(index)}
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
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WorksModal;

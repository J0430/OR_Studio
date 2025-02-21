import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import useClickOutside from "@hooks/useClickOuside";
import DirectionalButton from "@components/common/DirectionalButton/DirectionalButton";
import styles from "./ProjectsModal.module.scss";
import Image from "next/image";

function ProjectsModal({ selectedImage, project, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (project && selectedImage) {
      const index = project.images?.indexOf(selectedImage);
      if (index !== -1) {
        setCurrentImageIndex(index);
      }
    }
  }, [project, selectedImage]);

  const modalContentRef = useRef(null);
  useClickOutside(modalContentRef, onClose);

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
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
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        ref={modalContentRef}>
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

          <Image
            src={project.images[currentImageIndex]}
            alt={`Project Image ${currentImageIndex + 1}`}
            className={styles.modalImage}
            width={1200}
            height={1000}
            style={{ objectFit: "cover" }}
          />

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
              className={`${styles.thumbnailWrapper} ${
                index === currentImageIndex ? styles.activeThumbnail : ""
              }`}
              onClick={() => handleThumbnailClick(index)}>
              <Image
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

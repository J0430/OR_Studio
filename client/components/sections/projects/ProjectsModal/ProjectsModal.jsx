"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import useClickOutside from "@hooks/useClickOuside";
import DirectionalButton from "@components/common/DirectionalButton";
import styles from "./ProjectsModal.module.scss";
import Image from "next/image";

function ProjectsModal({ selectedImage, project, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    project.allImages?.indexOf(selectedImage)
  );

  const modalContentRef = useRef(null);

  useClickOutside(modalContentRef, onClose);

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === project.allImages?.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.allImages?.length - 1 : prev - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <motion.div
      className={styles.modalContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className={styles.modalBackdrop} onClick={closeModal} />
      <motion.div
        className={styles.modalContent}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}>
        <button
          className={styles.closeButton}
          onClick={closeModal}
          aria-label="Close Modal">
          ✕
        </button>
        <motion.div
          className={styles.imageWrapper}
          layoutid={selectedImage}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}>
          <DirectionalButton
            direction="left"
            onClick={handlePrevious}
            className={styles.leftButton}
          />

          <Image
            src={project.allImages[currentImageIndex]}
            alt="Project Image"
            className={styles.modalImage}
            width={1500}
            height={1300}
            style={{ objectFit: "cover" }}
          />
          <DirectionalButton
            direction="right"
            onClick={handleNext}
            className={styles.rightButton}
          />
        </motion.div>

        {/* Bottom Thumbnail Gallery */}
        <div className={styles.thumbnailGallery}>
          {project.allImages.map((image, index) => (
            <div
              key={index}
              className={`${styles.thumbnailWrapper} ${
                index === currentImageIndex ? styles.activeThumbnail : ""
              }`}
              onClick={() => handleThumbnailClick(index)}>
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={75}
                className={styles.thumbnailImage}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectsModal;

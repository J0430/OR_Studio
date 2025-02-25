import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { adjustGridItems } from "@utils/gridUtils";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import styles from "../ProjectsGrid/ProjectsGrid.module.scss";

const GridItem = ({
  imagePath,
  index,
  onImageClick,
  showImages,
  imageVariants,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className={styles.gridItem}
      key={imagePath || `project-${index}`}
      layoutId={imagePath}
      onClick={() => onImageClick(imagePath)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onImageClick(imagePath);
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open modal for Project ${index + 1}`}
      variants={imageVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}>
      {showImages ? (
        <Image
          src={imagePath}
          alt={`Project ${index + 1}`}
          width={300}
          height={200}
          className="loaded"
          quality={75}
          priority
        />
      ) : (
        <div
          className={styles.imagePlaceholder}
          aria-label="Loading image..."
        />
      )}
    </motion.div>
  );
};

const ProjectGrid = ({ projects, onImageClick }) => {
  if (!projects || projects.length === 0) {
    return <div>No projects available at this time.</div>;
  }

  const [showImages, setShowImages] = useState(false);
  useEffect(() => {
    let timeout;
    if (typeof window !== "undefined") {
      timeout = setTimeout(() => {
        adjustGridItems(`.${styles.gridItem}`);
        setShowImages(true); // Ensures images load only on the client
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, []);

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Detect if category has fewer than 4 projects
  const isSmallCategory = projects.length < 4;
  const gridClass = isSmallCategory
    ? styles.smallProjectsContainer
    : styles.projectsGridContainer;

  return (
    <motion.div
      className={styles.projectsOverFlow}
      aria-label="Project Grid"
      role="region">
      <div className={gridClass}>
        {projects.map((imagePath, index) => (
          <GridItem
            key={imagePath || `project-${index}`}
            imagePath={imagePath}
            index={index}
            onImageClick={onImageClick}
            showImages={showImages}
            imageVariants={imageVariants}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectGrid;

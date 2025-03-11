import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../ProjectsGrid/ProjectsGrid.module.scss";
import { useMediaQuery } from "react-responsive";

// ✅ Individual Grid Item with Animation
const GridItem = ({ imagePath, index, onImageClick, showImages }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.article
      ref={ref}
      className={styles.gridItem}
      key={`${imagePath || "default"}-${index}`}
      layoutId={imagePath}
      onClick={() => onImageClick(imagePath)}
      tabIndex={0}
      role="button"
      aria-label={`Open modal for Project ${index + 1}`}
      initial={{ opacity: 0, y: 100 }} // ✅ Start from bottom
      animate={
        inView && showImages
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.006, // ✅ Stagger effect
              },
            }
          : {}
      }>
      {showImages ? (
        <Image
          src={imagePath}
          alt={`Project ${index + 1}`}
          width={300}
          height={200}
          loading="lazy"
          className="loaded"
          quality={75}
        />
      ) : (
        <div className={styles.imagePlaceholder} />
      )}
    </motion.article>
  );
};

// ✅ Main Grid Component
const ProjectGrid = ({ projects, onImageClick }) => {
  const [showImages, setShowImages] = useState(false);

  // ✅ Delay loading until preloader is done
  useEffect(() => {
    const timeout = setTimeout(() => setShowImages(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const gridColumns = isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

  if (!projects || projects.length === 0) {
    return <div>No projects available at this time.</div>;
  }

  return (
    <motion.section
      className={styles.projectsOverFlow}
      aria-label="Project Grid"
      role="region">
      <div
        className={styles.projectsGridContainer}
        style={{ display: "grid", gridTemplateColumns: gridColumns }}>
        {projects.map((imagePath, index) => (
          <GridItem
            key={`${imagePath || "default"}-${index}`}
            imagePath={imagePath}
            index={index}
            onImageClick={onImageClick}
            showImages={showImages}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default ProjectGrid;

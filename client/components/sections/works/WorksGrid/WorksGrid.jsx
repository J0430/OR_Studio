import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../WorksGrid/WorksGrid.module.scss"; // ✅ Updated path

// ✅ Individual Grid Item with Animation
const WorksGridItem = ({ imagePath, index, onImageClick, showImages }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.article
      ref={ref}
      className={styles.worksGridItem}
      key={`${imagePath || "default"}-${index}`}
      layoutId={imagePath}
      onClick={() => onImageClick(imagePath)}
      tabIndex={0}
      role="button"
      aria-label={`Open modal for Work ${index + 1}`} // ✅ Updated to Work
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
          alt={`Work ${index + 1}`} // ✅ Updated to Work
          width={300}
          height={200}
          loading="lazy"
          className="loaded"
          quality={75}
        />
      ) : (
        <div className={styles.worksPlaceholder} /> // ✅ Updated class
      )}
    </motion.article>
  );
};

// ✅ Main Grid Component
const WorksGrid = ({ works, onImageClick, delay = 500 }) => {
  const [showImages, setShowImages] = useState(false);

  // ✅ Delay loading until preloader is done
  useEffect(() => {
    const timeout = setTimeout(() => setShowImages(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  if (!works || works.length === 0) {
    return <div>No works available at this time.</div>; // ✅ Updated to works
  }

  return (
    <motion.section
      className={styles.worksGridWrapper}
      aria-label="Works Grid" // ✅ Updated aria-label
      role="region">
      <div className={styles.worksGrid}>
        {" "}
        {/* ✅ Removed inline style, handled via SCSS */}
        {works.map((imagePath, index) => (
          <WorksGridItem
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

export default WorksGrid;

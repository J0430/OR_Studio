// ✅ WorksGrid.jsx

import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../WorksGrid/WorksGrid.module.scss";

// ✅ Individual Grid Item (FIXED)
const WorksGridItem = ({ work, index, onImageClick, showImages }) => {
  console.log(work.frontImage);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.article
      ref={ref}
      className={styles.worksGridItem}
      layoutId={work.frontImage}
      onClick={() => onImageClick(work.frontImage)} // ✅ Fixed: Pass only image path
      tabIndex={0}
      role="button"
      aria-label={`Open modal for Work ${index + 1}`}
      initial={{ opacity: 0, y: 100 }}
      animate={
        inView && showImages
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.006,
              },
            }
          : {}
      }>
      {showImages ? (
        <Image
          src={work.frontImage}
          alt={`Work ${index + 1}`}
          width={300}
          height={200}
          quality={75}
        />
      ) : (
        <div className={styles.worksPlaceholder} />
      )}
    </motion.article>
  );
};

// ✅ Main Grid Component (NO CHANGES NEEDED)
const WorksGrid = ({ works, onImageClick, delay = 500 }) => {
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowImages(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  if (!works.length) return <div>No works available at this time.</div>;

  return (
    <motion.section
      className={styles.worksGridWrapper}
      aria-label="Works Grid"
      role="region">
      <div className={styles.worksGrid}>
        {works.map((work, index) => (
          <WorksGridItem
            key={`${work.frontImage}-${index}`}
            work={work}
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

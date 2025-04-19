import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../WorksGrid/WorksGrid.module.scss";
import ScrollSectionNavigation from "@components/common/ScrollSectionNavigator/ScrollSectionNavigator";
import { images } from "next.config";

const WorksGridItem = ({
  key,
  work,
  works,
  src,
  index,
  onImageClick,
  showImages,
}) => {
  console.log(work);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeImage, setActiveImage] = useState(work.images?.[0]);

  const hoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
  };

  return (
    <motion.article
      ref={ref}
      className={styles.worksGridItem}
      layoutId={`image-${activeImage}`}
      onClick={() => onImageClick(activeImage)}
      tabIndex={0}
      role="button"
      aria-label={`Open modal for ${work.title}`}
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
      }
      whileHover="hover">
      {showImages && activeImage ? (
        <motion.div
          whileHover={hoverVariants}
          className={styles.hoverWrapper}
          // variants={hoverVariants}
          initial="rest"
          animate="rest">
          {/* // whileHover="hover"> */}
          {/* <ScrollSectionNavigation sections={works} id={index} /> */}
          <Image
            src={work.images?.[0]}
            alt={`Project: ${work.title}`}
            fill
            style={{ objectFit: "cover" }}
            className={styles.worksImage}
          />
        </motion.div>
      ) : (
        <div className={styles.worksPlaceholder} />
      )}
    </motion.article>
  );
};
{
  /* Overlay title */
}
{
  /* // className={styles.overlay} */
}
{
  /* // variants={{ */
}
{
  /* //   rest: { opacity: 0 },
            //   hover: { opacity: 1 },
            // }}
            // transition={{ duration: 0.4, ease: "easeInOut" }}> */
}
{
  /* <motion.h3
              className={styles.overlayTitle}
              variants={{
                rest: { y: 40, opacity: 0 },
                hover: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}>
              {work.title}
            </motion.h3> */
}
{
  /* </motion.div>) */
}

{
  /* Thumbnail Strip */
}
{
  /* </motion.div> */
}

// ✅ Main Grid
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
          <>
            <WorksGridItem
              key={`${work.title}-${index}`}
              work={work}
              works={works}
              src={work.images[0]}
              index={index}
              onImageClick={onImageClick}
              showImages={showImages}
            />
          </>
        ))}
      </div>
    </motion.section>
  );
};

export default WorksGrid;

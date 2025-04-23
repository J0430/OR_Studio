import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import ScrollShadow from "@components/common/ScrollShadow/ScrollShadow";
import Image from "next/image";
import styles from "../WorksGrid/WorksGrid.module.scss";

const WorksGridItem = (
  { work, index, onImageClick, showImages }
  // : {
  // work: any;
  // index: number;
  // onImageClick: (image: string) => void;
  // showImages: boolean;
  // }
) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.article
      ref={ref}
      className={styles.worksGridItem}
      layoutId={`work-item-${work.images[0]}`}
      onClick={() => onImageClick(work.images[0])}
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
        <div className={styles.hoverWrapper}>
          <Image
            src={work.images[0]}
            alt={`Project: ${work.title}`}
            fill
            style={{ objectFit: "cover" }}
            className={styles.worksImage}
          />
        </div>
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

const WorksGrid = ({ works, onImageClick, delay = 500 }) => {
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowImages(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  if (!works.length) return <div>No works available at this time.</div>;

  return (
    <ScrollShadow
      className={styles.scrollShadow}
      style={{ maxHeight: "80vh", overflowY: "auto" }}>
      <div className={styles.worksGrid}>
        {works.map((work, index) => (
          <WorksGridItem
            key={`${work.title}-${index}`}
            work={work}
            index={index}
            onImageClick={onImageClick}
            showImages={showImages}
          />
        ))}
      </div>
    </ScrollShadow>
  );
};

export default WorksGrid;

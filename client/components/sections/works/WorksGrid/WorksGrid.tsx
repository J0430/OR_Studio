import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../WorksGrid/WorksGrid.module.scss";
import type {
  Work,
  WorksGridItemProps,
  WorksGridProps,
} from "./WorksGrid.types";

const WorksGridItem: React.FC<WorksGridItemProps> = React.memo(
  ({ work, index, onImageClick, showImages }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const handleClick = useCallback(
      () => onImageClick(work),
      [onImageClick, work]
    );

    return (
      <motion.article
        ref={ref}
        className={styles.worksGridItem}
        layoutId={`work-item-${work.images[0].src}`}
        onClick={handleClick}
        initial={{ opacity: 0, y: 50 }}
        animate={
          inView && showImages
            ? {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.04,
                },
              }
            : {}
        }
        role="button"
        tabIndex={0}
        aria-label={`View project: ${work.title}`}>
        {showImages ? (
          <div className={styles.hoverWrapper}>
            <Image
              src={work.images[0].src}
              alt={`Thumbnail of project ${work.title}`}
              fill
              style={{ objectFit: "cover" }}
              className={styles.worksImage}
              priority={index < 3}
            />
          </div>
        ) : (
          <div className={styles.worksPlaceholder} aria-hidden="true" />
        )}
      </motion.article>
    );
  }
);

WorksGridItem.displayName = "WorksGridItem";

const WorksGrid: React.FC<WorksGridProps> = ({
  works,
  onImageClick,
  delay = 500,
}) => {
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowImages(true), delay);
    return () => clearTimeout(timeoutId);
  }, [delay]);

  const renderWorkItem = useCallback(
    (work: Work, index: number) => (
      <WorksGridItem
        key={`${work.title}-${index}`}
        work={work}
        index={index}
        onImageClick={onImageClick}
        showImages={showImages}
      />
    ),
    [onImageClick, showImages]
  );

  return (
    <section className={styles.worksGrid} aria-label="Works gallery">
      {works.map(renderWorkItem)}
    </section>
  );
};

export default WorksGrid;

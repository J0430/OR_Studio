import React from "react";
import styles from "./WorksGrid.module.scss";
import { dynamicImportComponents } from "utils/dynamicImportComponents";
import { WorksGridProps } from "./WorksGrid.types";

const { GridCard } = dynamicImportComponents("common", ["GridCard"]);

const WorksGrid: React.FC<WorksGridProps> = ({
  works = [],
  onImageClick,
  selectedTab,
}) => {
  console.log(works);
  return (
    <section className={styles.worksGridWrapper}>
      <div className={styles.worksGrid}>
        {works.length === 0 ? (
          <p className={styles.emptyMessage}>
            No projects available in this category.
          </p>
        ) : (
          works.map((work, index) => (
            <GridCard
              key={`${work.title}-${index}`}
              imageSrc={work.images[0].src}
              title={work.title}
              description={work.description}
              aspectRatio={16 / 9}
              index={index}
              layoutId={work.images[0].src}
              onClick={() => onImageClick(work)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default WorksGrid;

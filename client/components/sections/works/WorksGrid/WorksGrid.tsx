import React from "react";
import MediaCard from "@components/common/MediaCard";
import styles from "./WorksGrid.module.scss";
import { WorksGridProps } from "./WorksGrid.types";

const WorksGrid: React.FC<WorksGridProps> = ({ works, onImageClick }) => (
  <section className={styles.worksGridWrapper}>
    <div className={styles.worksGrid}>
      {works.map((work, index) => (
        <MediaCard
          key={`${work.title}-${index}`}
          imageSrc={work.images[0].src}
          title={work.title}
          description={work.description}
          aspectRatio={16 / 9}
          index={index}
          layoutId={`work-item-${work.images[0].src}`}
          onClick={() => onImageClick(work)}
        />
      ))}
    </div>
  </section>
);

export default WorksGrid;

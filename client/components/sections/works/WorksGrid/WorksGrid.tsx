import { useMemo } from "react";
import styles from "./WorksGrid.module.scss";
import { dynamicImportComponents } from "utils/dynamicImportComponents";
import { WorksGridProps } from "./WorksGrid.types";

const { GridCard } = dynamicImportComponents("common", ["GridCard"]);

const WorksGrid: React.FC<WorksGridProps> = ({
  works = [],
  onImageClick,
  selectedImage,
  categorySelected,
}) => {
  // Build a clean list with one card per project (front image = images[0])
  const items = useMemo(() => {
    const seen = new Set<string>();
    const list: Array<{ project: any; frontSrc: string }> = [];

    for (const project of works || []) {
      const frontSrc = project?.images?.[0]?.src;
      if (!frontSrc) continue;

      // de-dupe projects that point to exact same frontSrc by mistake
      if (seen.has(frontSrc)) continue;
      seen.add(frontSrc);

      list.push({ project, frontSrc });
    }

    return list;
  }, [works]);

  const catClass =
    categorySelected && styles[categorySelected]
      ? styles[categorySelected]
      : "";

  return (
    <section className={styles.worksGridWrapper}>
      <div className={`${styles.worksGrid} ${catClass}`}>
        {items.length === 0 ? (
          <p className={styles.emptyMessage}>
            No projects available in this category.
          </p>
        ) : (
          items.map(({ project, frontSrc }, i) => {
            const layoutId = frontSrc; // must equal what modal gets

            return (
              <GridCard
                key={project.id ?? project.slug ?? `${i}-${frontSrc}`}
                imageSrc={frontSrc}
                title={project?.title}
                description={project?.description}
                aspectRatio={16 / 9}
                index={i}
                layoutId={layoutId}
                onClick={() => onImageClick(frontSrc, layoutId)}
                work={project}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default WorksGrid;

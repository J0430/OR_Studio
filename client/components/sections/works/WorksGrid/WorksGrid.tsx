// // components/sections/works/WorksGrid/WorksGrid.tsx
// import { useState, useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import styles from "./WorksGrid.module.scss";
// import type {
//   Work,
//   WorksGridItemProps,
//   WorksGridProps,
// } from "./WorksGrid.types";

// // ✅ Individual Grid Item
// const WorksGridItem = ({
//   work,
//   index,
//   onImageClick,
//   showImages,
// }: WorksGridItemProps) => {
//   const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
//   console.log(work.frontImage, "work.image");

//   return (
//     <motion.article
//       ref={ref}
//       className={styles.worksGridItem}
//       layoutId={work.frontImage}
//       onClick={() => onImageClick(work.frontImage)}
//       tabIndex={0}
//       role="button"
//       aria-label={`Open modal for Work ${index + 1}`}
//       initial={{ opacity: 0, y: 100 }}
//       animate={
//         inView && showImages
//           ? {
//               opacity: 1,
//               y: 0,
//               transition: {
//                 duration: 0.4,
//                 ease: "easeOut",
//                 delay: index * 0.006,
//               },
//             }
//           : {}
//       }>
//       {showImages ? (
//         <Image
//           src={work.frontImage}
//           alt={`Work ${index + 1}`}
//           width={300}
//           height={200}
//           quality={75}
//         />
//       ) : (
//         <div className={styles.worksPlaceholder} />
//       )}
//     </motion.article>
//   );
// };

// // ✅ Main Grid Component
// const WorksGrid = ({ works, onImageClick, delay = 500 }: WorksGridProps) => {
//   const [showImages, setShowImages] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => setShowImages(true), delay);
//     return () => clearTimeout(timeout);
//   }, [delay]);

//   if (!works.length) return <div>No works available at this time.</div>;

//   return (
//     <motion.section
//       className={styles.worksGridWrapper}
//       aria-label="Works Grid"
//       role="region">
//       <div className={styles.worksGrid}>
//         {works.map((work, index) => (
//           <WorksGridItem
//             key={`${work.frontImage}-${index}`}
//             work={work}
//             index={index}
//             onImageClick={onImageClick}
//             showImages={showImages}
//           />
//         ))}
//       </div>
//     </motion.section>
//   );
// };

// export default WorksGrid;
// components/sections/works/WorksGrid/WorksGrid.tsx

// import { useEffect, useState } from "react";
// import MediaCard from "@components/common/MediaCard";
// import { motion } from "framer-motion";
// import styles from "./WorksGrid.module.scss";
// import type { WorksGridProps } from "./WorksGrid.types";

// const WorksGrid = ({ works, onImageClick, delay = 500 }: WorksGridProps) => {
//   const [showImages, setShowImages] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => setShowImages(true), delay);
//     return () => clearTimeout(timeout);
//   }, [delay]);

//   if (!works.length) return <div>No works available at this time.</div>;

//   return (
//     <motion.section
//       className={styles.worksGridWrapper}
//       aria-label="Works Grid"
//       role="region">
//       <div className={styles.worksGrid}>
//         {works.map((work, index) => (
//           <MediaCard
//             key={work.id || `${work.title}-${index}`}
//             showImages={showImages}
//             imageSrc={work.images[0]?.src}
//             title={work.title}
//             description={work.description}
//             aspectRatio={16 / 9}
//             index={index}
//             layoutId={work.images[0]?.src}
//             onClick={() => onImageClick(work)}
//           />
//         ))}
//       </div>
//     </motion.section>
//   );
// };

// export default WorksGrid;
import React from "react";

import styles from "./WorksGrid.module.scss";
import { dynamicImportComponents } from "utils/dynamicImportComponents";
import { WorksGridProps } from "./WorksGrid.types";

const { GridCard } = dynamicImportComponents("common", ["GridCard"]);

const WorksGrid: React.FC<WorksGridProps> = ({ works = [], onImageClick }) => (
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

export default WorksGrid;

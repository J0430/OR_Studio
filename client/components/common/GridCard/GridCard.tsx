import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./GridCard.module.scss";
import { GridCardProps } from "./GridCard.types";

const GridCard: React.FC<GridCardProps> = ({
  imageSrc,
  title,
  layoutId,
  onClick,
  index = 0,
  aspectRatio = 16 / 9,
  className = "",
}) => {
  return (
    <motion.article
      className={`${styles.mediaCard} ${className}`}
      layoutId={layoutId}
      onClick={() => onClick(layoutId)}
      tabIndex={0}
      role="button"
      aria-label={`Open project: ${title || "Untitled"}`}
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: "easeOut",
          delay: index * 0.006,
        },
      }}
      style={{ "--aspect-ratio": aspectRatio } as React.CSSProperties}>
      <Image
        src={imageSrc}
        alt={title || "Project Image"}
        fill
        style={{ objectFit: "cover" }}
      />
    </motion.article>
  );
};

export default GridCard;

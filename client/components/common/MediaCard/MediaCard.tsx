// components/common/MediaCard/MediaCard.tsx
import React from "react";
import Image from "next/image";
import styles from "./MediaCard.module.scss";
import type { MediaCardProps } from "./MediaCard.types";

const MediaCard: React.FC<MediaCardProps> = ({
  imageSrc,
  title,
  layoutId,
  onClick,
  className = "",
}) => {
  return (
    <article className={`${styles.mediaCard} ${className}`} onClick={onClick}>
      <Image src={imageSrc} alt={title || "Media Image"} fill />
      {/* {title && (
        <div className={styles.overlay}>
          <h3>{title}</h3>
        </div>
      )} */}
    </article>
  );
};

export default MediaCard;

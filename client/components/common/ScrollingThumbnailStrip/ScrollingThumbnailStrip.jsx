// Purpose: Thumbnail strip with looping behavior, clone logic, and sync animations

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./ScrollingThumbnailStrip.module.scss";

export default function ScrollingThumbnailStrip({
  images = [],
  imageWidth = 96,
  imageHeight = 60,
  gap = 20,
  scrollInterval = 5000,
  activeImageClass = "activeImageClass",
  view = "horizontal",
  onThumbnailClick = () => {},
  activeIndex,
}) {
  const [thumbs, setThumbs] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);

  // Initialize with clone logic
  useEffect(() => {
    if (images.length >= 2) {
      const reordered = [...images];
      const clone = images[0];
      reordered.splice(images.length - 1, 0, clone); // insert before last
      reordered.push(clone); // true clone at the end
      setThumbs(reordered);
    }
  }, [images]);

  // Animation loop
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        const updated = [...thumbs];
        const moved = updated.shift();
        updated.splice(thumbs.length - 2, 0, moved);
        setThumbs(updated);
        setIsAnimating(false);
      }, 800);
    }, scrollInterval);

    return () => clearInterval(timerRef.current);
  }, [thumbs, scrollInterval]);

  return (
    <div
      className={`${styles.ScrollingThumbnailStrip} ${styles[view]}`}
      style={{ "--gap": `${gap}px` }}>
      <div className={styles.strip}>
        {thumbs.map((src, index) => {
          const base = styles.thumbnail;
          const isFirst = index === 0 && isAnimating;
          const isMiddle =
            index > 0 && index < thumbs.length - 2 && isAnimating;
          const isCloneEntering = index === thumbs.length - 1 && isAnimating;
          const isActive = index === 1;

          return (
            <div
              key={src + index}
              className={[
                base,
                isFirst && styles.isRemoved,
                isMiddle && styles.isShifting,
                isCloneEntering && styles.isAppearingFromRight,
                isActive && styles[activeImageClass],
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onThumbnailClick(index)}>
              <Image
                src={src}
                alt={`thumb-${index}`}
                width={imageWidth}
                height={imageHeight}
                style={{ objectFit: "cover" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

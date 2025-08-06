// import React from "react";
// import { motion } from "framer-motion";
// import styles from "./IconButton.module.scss";
// import type { IconButtonProps } from "./IconButton.types";

// const IconButton: React.FC<IconButtonProps> = ({
//   direction = "down",
//   width = 3.2,
//   height = 3.2,
//   onClick,
//   className = "",
// }) => {
//   const isZoom = direction === "zoomIn" || direction === "zoomOut";

//   return (
//     <motion.div
//       className={`${styles.iconButtonWrapper} ${styles[direction]} ${className}`}
//       style={
//         {
//           "--button-width": `${width}rem`,
//           "--button-height": `${height}rem`,
//         } as React.CSSProperties
//       }
//       onClick={onClick}
//       aria-label={`Scroll ${direction}`}>
//       <button className={styles.iconButton}>
//         {isZoom ? (
//           <span className={styles.zoomSymbol}>
//             {direction === "zoomIn" ? "+" : "−"}
//           </span>
//         ) : (
//           <span className={styles.arrowIcon} />
//         )}
//       </button>
//     </motion.div>
//   );
// };

// export default IconButton;
import React from "react";
import { motion } from "framer-motion";
import styles from "./IconButton.module.scss";
import type { IconButtonProps } from "./IconButton.types";

const IconButton: React.FC<IconButtonProps> = ({
  direction = "down",
  width = 2.5,
  height = 2.5,
  onClick,
  className = "",
}) => {
  const isZoom = direction === "zoomIn" || direction === "zoomOut";

  return (
    <motion.button
      className={`${styles.iconButton} ${styles[direction]} ${className}`}
      style={
        {
          "--button-width": `${width}rem`,
          "--button-height": `${height}rem`,
        } as React.CSSProperties
      }
      onClick={onClick}
      aria-label={`Scroll ${direction}`}>
      {isZoom ? (
        <span className={styles.zoomSymbol}>
          {direction === "zoomIn" ? "+" : "−"}
        </span>
      ) : (
        <span className={styles.arrowIcon} />
      )}
    </motion.button>
  );
};

export default IconButton;

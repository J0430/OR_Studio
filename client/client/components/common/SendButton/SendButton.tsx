// import React from "react";
// import styles from "./SendButton.module.scss";
// import type { SendButtonProps } from "./SendButton.types";

// /** 3-line arrow (stem + two arms) with no animation */
// const Arrow3: React.FC<{
//   direction?: "up" | "down" | "left" | "right";
//   sizeRem?: number;
//   color?: string;
//   className?: string;
// }> = ({ direction = "up", sizeRem = 1.1, color, className = "" }) => {
//   const style: React.CSSProperties = {
//     ["--arrow-size" as any]: `${sizeRem}rem`,
//     ...(color ? { ["--arrow-color" as any]: color } : {}),
//   };
//   return (
//     <span
//       className={[
//         styles.arrow3,
//         // styles[\`dir_\${direction}\`],
//         className,
//       ].join(" ")}
//       style={style}
//       aria-hidden="true"
//     >
//       <i className={styles.stem} />
//       <i className={styles.armL} />
//       <i className={styles.armR} />
//     </span>
//   );
// };

// export const SendButton: React.FC<SendButtonProps> = ({
//   label = "Send",
//   direction = "up",
//   sizeRem = 2.5,
//   expandedWidthRem = 7,
//   submit = true,
//   isSubmitting = false,
//   className = "",
//   disabled,
//   ...rest
// }) => {
//   const typeProp: "submit" | "button" = submit ? "submit" : "button";

//   const styleVars = {
//     ["--h" as any]: \`clamp(2rem, 6vw, \${sizeRem}rem)\`,
//     ["--w-collapsed" as any]: \`clamp(2rem, 6vw, \${sizeRem}rem)\`,
//     ["--w-expanded" as any]: \`\${expandedWidthRem}rem\`,
//   } as React.CSSProperties;

//   return (
//     <button
//       type={typeProp}
//       className={[styles.sendButton, className].join(" ")}
//       style={styleVars}
//       data-expanded={isSubmitting ? "true" : undefined}
//       disabled={!!disabled || isSubmitting}
//       aria-busy={isSubmitting || undefined}
//       aria-label={isSubmitting ? "Sending…" : label}
//       {...rest}
//     >
//       <span className={styles.focusRing} aria-hidden="true" />
//       <span className={styles.content}>
//         <span className={styles.iconWrap}>
//           <Arrow3 direction={direction} />
//         </span>
//         <span className={styles.label}>
//           {isSubmitting ? "Sending…" : label}
//         </span>
//       </span>
//     </button>
//   );
// };

// export default SendButton;

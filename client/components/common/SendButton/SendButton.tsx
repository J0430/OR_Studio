// components/common/SendButton/SendButton.tsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

import styles from "./SendButton.module.scss";
import { SendButtonIcon } from "./SendButtonIcon";
import type { SendButtonProps } from "./SendButton.types";

export const SendButton: React.FC<SendButtonProps> = ({
  label = "Send",
  direction = "up",
  sizeRem = 2.5,
  expandedWidthRem = 7,
  submit = true,
  onClick,
  className = "",
  disabled,
  forceExpanded = false,
  isSubmitting = false, // ✅ add this
  ...rest
}) => {
  const prefersReduced = useReducedMotion();

  const typeProp: "submit" | "button" = submit ? "submit" : "button";

  // example usage:
  const finalLabel = isSubmitting ? "Sending..." : label;
  const initialWidth = `${sizeRem}rem`;
  const expandedWidth = `${expandedWidthRem}rem`;

  const variants = prefersReduced
    ? undefined
    : {
        rest: {
          width: initialWidth,
          transition: { type: "spring", stiffness: 300, damping: 26 },
        },
        expand: {
          width: expandedWidth,
          transition: { type: "spring", stiffness: 260, damping: 22 },
        },
      };

  // morph: arrow fades out as text fades in (slight overlap)
  const arrowVariants = prefersReduced
    ? undefined
    : {
        rest: { opacity: 1, x: 0, transition: { duration: 0.12 } },
        expand: { opacity: 0, x: -4, transition: { duration: 0.14 } },
      };

  const labelVariants = prefersReduced
    ? undefined
    : {
        rest: {
          opacity: 0,
          x: 6,
          clipPath: "inset(0 100% 0 0)",
          transition: { duration: 0.1 },
        },
        expand: {
          opacity: 1,
          x: 0,
          clipPath: "inset(0 0% 0 0)",
          transition: { duration: 0.18, delay: 0.02 },
        },
      };

  return (
    <motion.button
      type={typeProp}
      className={[styles.sendButton, className].join(" ")}
      disabled={!!disabled}
      aria-label={label}
      onClick={onClick}
      style={{ height: `clamp(2rem, 6vw, ${sizeRem}rem)` }}
      initial="rest"
      animate={forceExpanded ? "expand" : "rest"}
      variants={variants}
      whileHover={prefersReduced ? undefined : "expand"}
      whileFocus={prefersReduced ? undefined : "expand"}
      {...rest}>
      {/* visible focus ring per WCAG 2.4.7 */}
      <span className={styles.focusRing} aria-hidden="true" />

      <span className={styles.content}>
        <motion.span
          className={styles.iconWrap}
          variants={arrowVariants}
          aria-hidden="true">
          <SendButtonIcon direction={direction} />
        </motion.span>
      </span>
    </motion.button>
  );
};

export default SendButton;

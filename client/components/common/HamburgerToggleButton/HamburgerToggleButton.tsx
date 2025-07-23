import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import useResizeObserver from "@hooks/useResizeObserver"; // ✅ Custom hook you’ll create below
import styles from "./HamburgerToggleButton.module.scss";

/**
 * HamburgerToggleButton
 *
 * @param {boolean} isOpen - Menu toggle state
 * @param {Function} onToggle - Function to toggle the button
 * @param {number} gapBetweenLines - Vertical gap in px
 * @param {string} lineWidth - Optional fixed width of the lines (e.g., "34px")
 * @param {string} variant - Optional visual variant (e.g., "square")
 */
const HamburgerToggleButton = ({
  isOpen,
  onToggle,
  gapBetweenLines = 6,
  lineWidth,
  variant = "default",
}) => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const [dynamicWidth, setDynamicWidth] = useState("34px");

  // 📏 Dynamically update lineWidth on container resize
  useResizeObserver(ref, (entry) => {
    const width = entry.contentRect.width;
    if (!lineWidth) {
      setDynamicWidth(`${Math.min(34, width * 0.7)}px`);
    }
  });

  return (
    <button
      ref={ref}
      className={`${styles.hamburgerButton} ${styles[variant] || ""}`}
      onClick={onToggle}
      aria-label="Toggle navigation"
      aria-expanded={isOpen}>
      {/* Top Line */}
      <motion.span
        className={styles.line}
        style={{
          width: lineWidth || dynamicWidth,
          top: isOpen ? "50%" : `calc(50% - ${gapBetweenLines}px)`,
        }}
        animate={{
          rotate: isOpen ? 45 : 0,
          y: "-50%",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Middle Line */}
      <motion.span
        className={styles.line}
        style={{
          width: lineWidth || dynamicWidth,
        }}
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Bottom Line */}
      <motion.span
        className={styles.line}
        style={{
          width: lineWidth || dynamicWidth,
          top: isOpen ? "50%" : `calc(50% + ${gapBetweenLines}px)`,
        }}
        animate={{
          rotate: isOpen ? -45 : 0,
          y: "-50%",
        }}
        transition={{ duration: 0.3 }}
      />
    </button>
  );
};

export default HamburgerToggleButton;

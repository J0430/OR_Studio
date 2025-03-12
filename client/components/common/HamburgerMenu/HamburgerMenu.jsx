import { motion } from "framer-motion";
import styles from "./HamburgerMenu.module.scss";

/**
 * HamburgerMenu Component
 *
 * @param {boolean} isOpen - Whether the menu is open
 * @param {function} onToggle - Function to toggle menu state
 */
const HamburgerMenu = ({ isOpen, onToggle }) => {
  return (
    <button
      className={styles.hamburger}
      onClick={onToggle}
      aria-label="Toggle menu">
      {/* Top Line */}
      <motion.span
        className={styles.line}
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: { rotate: 0, y: 0 },
          open: { rotate: 45, y: 8 },
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Middle Line */}
      <motion.span
        className={styles.line}
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Bottom Line */}
      <motion.span
        className={styles.line}
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: { rotate: 0, y: 0 },
          open: { rotate: -45, y: -8 },
        }}
        transition={{ duration: 0.3 }}
      />
    </button>
  );
};

export default HamburgerMenu;

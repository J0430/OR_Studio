import { motion } from "framer-motion";
import styles from "./HamburgerMenu.module.scss";

const HamburgerMenu = ({ isOpen, onToggle }) => {
  return (
    <button
      className={styles.hamburger}
      onClick={onToggle} // ✅ Clicking toggles the state
      aria-label="Toggle menu">
      <motion.span
        className={styles.line}
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: { rotate: 0, y: 0 },
          open: { rotate: 45, y: 8 },
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className={styles.line}
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.3 }}
      />
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

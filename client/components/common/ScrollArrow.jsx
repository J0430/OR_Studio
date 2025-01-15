import { motion } from "framer-motion";
import styles from "./ScrollArrow.module.scss";

const ScrollArrow = ({ targetId, isLastSection = false }) => {
  const handleScroll = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleScroll}
      aria-label={`Scroll to ${targetId}`}
      style={{
        position: "relative", // Ensure proper alignment with other content
        zIndex: 10000,
      }}>
      <button className={styles.scrollButton}>
        <span
          className={styles.arrow}
          style={{
            transform: isLastSection
              ? "rotate(135deg)" // Arrow points upwards for the last section
              : "rotate(-45deg)", // Arrow points downwards for other sections
          }}
        />
      </button>
    </motion.div>
  );
};

export default ScrollArrow;

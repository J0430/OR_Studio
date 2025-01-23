import { motion } from "framer-motion";
import styles from "./DirectionalButton.module.scss";

const DirectionalButton = ({ direction = "down", width, hight, onClick }) => {
  return (
    <motion.div
      style={{ width: `${width}rem`, hight: `${hight}rem` }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      aria-label={`Scroll ${direction}`}
      className={`${styles.direction} ${styles[direction]}`}>
      <button className={styles.scrollButton}>
        <span className={styles.arrow} />
      </button>
    </motion.div>
  );
};

export default DirectionalButton;

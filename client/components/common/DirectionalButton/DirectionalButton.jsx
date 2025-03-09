import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io"; // ✅ Import arrow icon
import styles from "./DirectionalButton.module.scss";

const DirectionalButton = ({
  direction = "down",
  width = 4.5,
  height = 4.5,
  onClick,
}) => {
  return (
    <motion.div
      className={`${styles.direction} ${styles[direction]}`}
      style={{
        "--button-width": `${width}rem`,
        "--button-height": `${height}rem`,
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      aria-label={`Scroll ${direction}`}>
      <button className={styles.scrollButton}>
        <IoIosArrowBack className={styles.arrow} />
      </button>
    </motion.div>
  );
};

export default DirectionalButton;

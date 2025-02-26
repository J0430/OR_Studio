import { motion } from "framer-motion";
import styles from "../ProgressBar/ProgressBar.module.scss";

const ProgressBar = ({ currentIndex, totalImages, duration }) => {
  return (
    <div className={styles.progressContainer}>
      {Array.from({ length: totalImages }).map((_, idx) => (
        <div key={idx} className={styles.progressWrapper}>
          <motion.div
            className={`${styles.progressBar} ${
              idx === currentIndex ? styles.active : ""
            }`}
            initial={{ width: "0%" }}
            animate={{ width: idx === currentIndex ? "100%" : "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;

import { motion } from "framer-motion";
import styles from "../ProgressBar/ProgressBar.module.scss";

const ProgressBar = ({ isActive, duration }) => {
  return (
    <div className={styles.progressWrapper}>
      <motion.div
        className={styles.progressBar}
        initial={{ width: "0%" }}
        animate={isActive ? { width: "100%" } : { width: "0%" }}
        transition={
          isActive
            ? { duration: duration / 1000, ease: "linear" }
            : { duration: 0 }
        }
      />
    </div>
  );
};

export default ProgressBar;

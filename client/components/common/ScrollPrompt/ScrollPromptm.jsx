"use client";
import { motion } from "framer-motion";
import styles from "../ScrollPrompt/ScrollPrompt2.module.scss";

const GridItemPrompt = ({ index }) => {
  return (
    <motion.div
      className={styles.prompt}
      initial={{ opacity: 0, x: 10, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 10, y: 10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}>
      <span className={styles.number}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <motion.div layoutId="dot-line" className={styles.dotLine} />
    </motion.div>
  );
};

export default GridItemPrompt;

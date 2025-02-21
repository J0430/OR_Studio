import React from "react";
import styles from "./TypingEffect.module.scss";

const TypingEffect = ({ text = "" }) => {
  return (
    <div className={styles.typingContainer}>
      <span className={styles.typingText}>{text}</span>
    </div>
  );
};

export default TypingEffect;

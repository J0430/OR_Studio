import React, { useState, useEffect } from "react";
import styles from "./TypingEffect.module.scss";

const TypingEffect = ({ text = "", typingSpeed, delay }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!text || typeof text !== "string") return; // Exit if the text is invalid

    let index = 0;

    const typeInterval = setInterval(() => {
      if (index + 1 < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setTypingDone(true), delay); // Delay after typing is done
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval); // Cleanup on unmount
  }, [text, typingSpeed, delay]);

  return (
    <div className={styles.typingContainer}>
      <span
        className={
          typingDone || displayedText.length === 0
            ? `${styles.typingText} ${styles.noCursor}`
            : styles.typingText
        }>
        &nbsp;{displayedText}
      </span>
    </div>
  );
};

export default TypingEffect;

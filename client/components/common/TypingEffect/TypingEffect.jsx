import { useState, useEffect } from "react";
import styles from "./TypingEffect.module.scss";

/**
 * TypingEffect component to display typing animation with optional cursor.
 * @param {string} text - Text to be typed.
 * @param {number} typingSpeed - Speed of typing (ms per character).
 * @param {number} delay - Delay after typing ends before stopping the cursor.
 */
const TypingEffect = ({
  text = "Loading...", // ✅ Safe fallback
  typingSpeed = 100, // ✅ Safe fallback
  delay = 2000, // ✅ Safe fallback
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false); // ✅ Track typing completion

  useEffect(() => {
    if (!text || typeof text !== "string") return; // ✅ Safety check

    let index = 0;

    const typeInterval = setInterval(() => {
      if (index + 1 < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setTypingDone(true), delay); // ✅ Stop cursor blinking after delay
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval); // ✅ Cleanup on unmount
  }, [text, typingSpeed, delay]);

  return (
    <div className={styles.typingContainer}>
      <span
        className={
          typingDone
            ? `${styles.typingText} ${styles.noCursor}` // ✅ Stop cursor when done
            : styles.typingText
        }>
        {displayedText}
      </span>
    </div>
  );
};

export default TypingEffect;

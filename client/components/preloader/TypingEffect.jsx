"use client";

import React, { useEffect } from "react";
import styles from "./TypingEffect.module.scss";

const TypingEffect = ({ text }) => {
  useEffect(() => {
    const typingElement = document.querySelector(`.${styles.typingText}`);
    if (!typingElement) return;

    const fullText = text;
    let index = 0;
    console.log(fullText.at(-1), typingElement.textContent);

    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        typingElement.textContent += fullText[index];
        index++;
      } else {
        clearInterval(typeInterval); // Detiene el efecto al finalizar
      }
    }, 70);

    return () => clearInterval(typeInterval);
  }, [text]);

  return (
    <div className={styles.typingContainer}>
      <span className={styles.typingText}></span>
      {} <span className={styles.cursor}></span>
    </div>
  );
};

export default TypingEffect;

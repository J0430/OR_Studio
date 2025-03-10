import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./AboutBanner.module.scss";

const AboutBanner = () => {
  const ref = useRef(); // Reference for in-view detection
  const isInView = useInView(ref, { once: true, margin: "-30% 0px" }); // Trigger when 30% in view

  const text = `OR Studio is an end-to-end digital production house with expertise in real estate visualization and animation, offering best-in-class services ranging from a single photo-realistic render to advanced animations, tailor-made interior design services, and state-of-the-art post-production.`;

  const words = text.split(" "); // Split paragraph into words

  return (
    <div ref={ref} className={styles.aboutWrapper}>
      <div className={styles.textContainer}>
        <p className={styles.description}>
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0.6, scale: 0.9 }} // ✅ Start small and semi-transparent
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0.8, scale: 0.95 }
              } // ✅ Animate to full size and opacity
              transition={{
                delay: index * 0.25, // ✅ Per word delay (like dictation)
                duration: 0.4, // ✅ Tiny smooth grow effect
              }}
              className={styles.word}>
              {word}&nbsp;
            </motion.span>
          ))}
        </p>

        {/* ✅ Button appears AFTER reading */}
        <motion.div
          className={styles.linkWrapper}
          initial={{ opacity: 0.8 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: words.length * 0.25 + 0.3, // After last word finishes
          }}
          whileHover={{
            scale: 1.08,
            transition: { duration: 0.15 },
          }}>
          <Link href="/about" className={styles.link}>
            More about us
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutBanner;

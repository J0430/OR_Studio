import { useRef } from "react";
import { useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./AboutBanner.module.scss";

const AboutBanner = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-30% 0px",
  });

  const paragraph =
    "OR Studio is an end-to-end digital production house with expertise in real estate visualization and animation, offering best-in-class services ranging from a single photo-realistic render to advanced animations, tailor-made interior design services, and state-of-the-art post-production.";

  const words = paragraph.split(" ");

  return (
    <>
      <div ref={ref} className={styles.aboutWrapper}>
        <div className={styles.textContainer}>
          <p className={styles.description} aria-label="About OR Studio text">
            {words.map((word, index) => (
              <motion.span key={index} className={styles.word}>
                {word}&nbsp;
              </motion.span>
            ))}
          </p>
          <motion.div
            className={styles.linkWrapper}
            whileHover={{ scale: 1.08 }}>
            <Link href="/about" className={styles.link}>
              More about us
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};
export default AboutBanner;

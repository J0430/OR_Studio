import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./AboutBanner.module.scss";

const AboutBanner = () => {
  return (
    <motion.div
      className={styles.aboutWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }} // Faster transition
    >
      <motion.div
        className={styles.textContainer}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }} // Reduced duration
      >
        <p className={styles.description}>
          OR Studio is an end-to-end digital production house with expertise in
          real estate visualization and animation, offering best-in-class
          services ranging from a single photo-realistic render to advanced
          animations, tailor-made interior design services, and state-of-the-art
          post-production.
        </p>

        <motion.div
          className={styles.linkWrapper}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }} // Faster reveal
          whileHover={{
            scale: 1.08, // Slight hover effect
            transition: { duration: 0.15 },
          }}>
          <Link href="/about" className={styles.link}>
            More about us
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AboutBanner;

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "../LandingAbout/LandingAbout.module.scss";

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.4,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.6,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const fadeFromBottomLeft = {
  hidden: { opacity: 0, x: -60, y: 60 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export default function LandingAbout({ images = [] }) {
  return (
    <section className={styles.hero}>
      {/* === Left Text Block === */}
      <motion.div
        className={styles.left}
        variants={parentVariants}
        initial="hidden"
        animate="visible">
        <div className={styles.textBlockWrapper}>
          <motion.h1 variants={fadeUp}>
            Designing <br />
            spaces that <br />
            reflect your <br />
            story
          </motion.h1>

          <motion.p className={styles.description} variants={fadeUp}>
            Architectural animation and visualization go beyond static
            renderings — they create immersive narratives that bring unbuilt
            environments to life.
          </motion.p>

          <motion.a className={styles.contact} variants={fadeUp}>
            <Link href="/contact">Link Contact us</Link>
          </motion.a>
          <motion.div
            className={styles.bottomLeftImageWrapper}
            variants={fadeFromBottomLeft}>
            <Image
              src="/assets/logos/Or_Studio_w.png"
              alt="Or Studio Logo"
              width={130}
              height={50}
              className={styles.extraSmallImage}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* === Right Image Block (Grouped as One Unit) === */}
      <motion.div
        className={styles.right}
        variants={fadeInRight}
        initial="hidden"
        animate="visible">
        <div className={styles.imageBlock}>
          <div className={styles.combinedWrapper}>
            <Image
              src="/assets/works/categories/office/Project1/09.jpg"
              alt="Main background"
              width={2500}
              height={1500}
              className={styles.bgImage}
              priority
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

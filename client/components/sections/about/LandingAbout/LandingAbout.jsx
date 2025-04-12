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
        <motion.h1 variants={fadeUp}>
          Designing <br />
          spaces that <br />
          reflect your <br />
          story
        </motion.h1>

        <motion.p className={styles.description} variants={fadeUp}>
          Architectural animation and visualization go beyond static renderings
          — they create immersive narratives that bring unbuilt environments to
          life.
        </motion.p>

        <motion.a className={styles.contact} variants={fadeUp}>
          <Link href="/contact">Link Contact us</Link>{" "}
        </motion.a>

        <motion.div
          className={styles.bottomLeftImage}
          variants={fadeFromBottomLeft}>
          <Image
            src="/assets/logos/Or_Studio_w.png"
            alt="Or Studio Logo"
            width={250}
            height={100}
            className={styles.extraSmallImage}
          />
        </motion.div>
      </motion.div>

      {/* === Right Image Block (Grouped) === */}
      <motion.div
        className={styles.right}
        variants={fadeInRight}
        initial="hidden"
        animate="visible">
        <div className={styles.imageBlock}>
          <div className={styles.imageWrapper}>
            <Image
              src="/assets/works/categories/office/Project1/09.jpg"
              alt="Interior Large"
              width={2500}
              height={1500}
              className={styles.bgImage}
              priority
            />
          </div>

          {/* ✅ Overlay OUTSIDE wrapper, but still inside imageBlock */}
          <motion.div className={styles.overlayImage} variants={fadeScale}>
            <Image
              src="/assets/works/categories/residential/r_project23/3.jpg"
              alt="Interior Detail"
              width={220}
              height={180}
              className={styles.smallImage}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

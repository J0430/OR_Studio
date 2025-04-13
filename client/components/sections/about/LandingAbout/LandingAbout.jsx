import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
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

export default function LandingAbout() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <section className={styles.hero}>
      {/* LEFT BLOCK */}
      <div className={styles.aboutWrapper}>
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
            Architectural animation and visualization go beyond static
            renderings — they create immersive narratives that bring unbuilt
            environments to life.
          </motion.p>

          <motion.a className={styles.contact} variants={fadeUp}>
            <Link href="/contact">Contact us</Link>
          </motion.a>

          <motion.div
            className={styles.bottomLeftImage}
            variants={fadeFromBottomLeft}>
            <Image
              src="/assets/logos/Or_Studio_w.png"
              alt="Or Studio Logo"
              width={220}
              height={100}
              className={styles.extraSmallImage}
            />
          </motion.div>
        </motion.div>

        {/* RIGHT BLOCK */}
        <motion.div
          className={styles.right}
          variants={fadeInRight}
          initial="hidden"
          animate="visible">
          <div className={styles.imageWrapper}>
            <Image
              src="/assets/works/categories/office/Project1/09.jpg"
              alt="Main background"
              fill
              // width={isMobile ? 800 : 1400}
              // height={isMobile ? 40 : 1000}
              className={styles.bgImage}
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

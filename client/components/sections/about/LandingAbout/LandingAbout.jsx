import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./LandingAbout.module.scss";

const fadeFromBottomLeft = {
  hidden: { opacity: 0, x: -60, y: 60 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export default function LandingAbout() {
  return (
    <section className={styles.hero}>
      {/* LEFT */}
      <div className={styles.left}>
        <div className={styles.textBlockWrapper}>
          <h1>Designing spaces that reflect your story</h1>
          <p>
            Architectural animation and visualization go beyond static
            renderings — they create immersive narratives that bring unbuilt
            environments to life.
          </p>
        </div>

        <motion.div
          className={styles.bottomLeftImage}
          initial="hidden"
          animate="visible"
          variants={fadeFromBottomLeft}>
          <Image
            src="/assets/logos/Or_Studio_w.png"
            alt="Or Studio Logo"
            width={150}
            height={70}
            className={styles.extraSmallImage}
          />
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <Image
          src="/assets/works/categories/office/Project1/09.jpg"
          alt="Main background"
          width={600}
          height={800}
          style={{ objectFit: "cover" }}
        />
      </div>
    </section>
  );
}

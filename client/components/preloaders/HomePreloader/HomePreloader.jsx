import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { preloaderLogos } from "@utils/globals";
import { usePageContext } from "@contexts/PageContext/PageContext";
import Image from "next/image";
import styles from "./HomePreloader.module.scss";

const HomePreloader = () => {
  const { isPreloaderVisible, onImageLoad } = usePageContext();

  return (
    <AnimatePresence mode="wait">
      {isPreloaderVisible && (
        <motion.div
          className={styles.preloaderWrapper}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: [0.9, 0, 1, 1] }}
          exit={{ opacity: 0 }}>
          <motion.div className={styles.preloaderContainer}>
            {/* Logo 1 */}
            <motion.div
              initial={{ filter: "blur(1rem)", opacity: 0 }}
              animate={{ filter: "blur(0rem)", opacity: 1 }}
              exit={{
                opacity: 0,
                filter: "blur(1rem)",
                transition: { duration: 1 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={styles.preloaderLogo}>
              <Image
                src={preloaderLogos[1]}
                alt="OR Logo"
                width={60}
                height={60}
                priority
                onLoad={onImageLoad}
              />
            </motion.div>

            {/* Logo 2 */}
            <motion.div
              initial={{
                filter: "blur(1.5rem)",
                scale: 0.5,
                opacity: 0,
                y: -150,
              }}
              animate={{ filter: "blur(0rem)", scale: 1.8, opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 1.2,
                filter: "blur(1rem)",
                transition: { duration: 1 },
              }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              className={styles.preloaderLogo}>
              <Image
                src={preloaderLogos[0]}
                alt="OR Studio Logo"
                width={90}
                height={90}
                priority
                onLoad={onImageLoad}
              />
            </motion.div>
            <motion.div
              className={styles.textContainer}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.25, 1, 0.5, 1], // easeOutExpo-like
                delay: 0.3,
              }}>
              <p>Architecture Visualization</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomePreloader;

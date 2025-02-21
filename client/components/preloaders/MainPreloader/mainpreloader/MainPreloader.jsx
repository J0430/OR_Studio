import { motion, AnimatePresence } from "framer-motion";
import { preloader } from "@utils/globals";
import { usePreloader } from "@contexts/MainPreloaderContext";
import Image from "next/image";
import styles from "./MainPreloader.module.scss";

const TypingEffect = dynamic(
  () => import("../mainpreloader/TypingEffect/TypingEffect"),
  { ssr: false }
);

const MainPreloader = () => {
  const { isPreloaderVisible, onImageLoad } = usePreloader();

  return (
    <AnimatePresence mode="wait">
      {isPreloaderVisible && (
        <motion.div
          className={styles.preloaderWrapper}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            transition: { duration: 1.5, ease: "easeInOut" },
          }} // ✅ Smoother transition
          transition={{ duration: 1.5, ease: "easeOut" }}>
          <motion.div className={styles.preloaderContainer}>
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
                src={preloader[1]}
                alt="OR Logo"
                width={70}
                height={70}
                priority
                onLoad={onImageLoad}
              />
            </motion.div>

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
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={styles.preloaderLogo}>
              <Image
                src={preloader[0]}
                alt="OR Studio Logo"
                width={90}
                height={90}
                priority
                onLoad={onImageLoad}
              />
            </motion.div>

            <TypingEffect
              text="Architecture Visualization"
              typingSpeed={70}
              delay={40000}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainPreloader;

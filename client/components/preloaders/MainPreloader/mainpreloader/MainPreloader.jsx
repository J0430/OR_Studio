import { motion, AnimatePresence } from "framer-motion";
import { preloaderLogos } from "@utils/globals";
import { usePreloader } from "@contexts/MainPreloaderContext";
import TypingEffect from "@components/common/TypingEffect/TypingEffect";
import Image from "next/image";
import styles from "./MainPreloader.module.scss";

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
            transition: { duration: 1.3, ease: "easeInOut" },
          }} // ✅ Smoother transition
          transition={{ duration: 1.3, ease: "easeOut" }}>
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainPreloader;

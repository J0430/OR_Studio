import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedLogo from "@components/common/AnimatedLogo/AnimatedLogo";
import styles from "./LogoPreloader.module.scss";
import type { LogoPreloaderProps } from "./LogoPreloader.types";

const LogoPreloader: React.FC<LogoPreloaderProps> = ({
  duration = 2,
  logoProps,
  onFinish,
}) => {
  const router = useRouter();
  const pathname = router.pathname;
  const isHome = pathname === "/";

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const navType = navEntry?.type || "navigate";

    const shouldShowHomePreloader =
      isHome &&
      (navType === "reload" || navType === "navigate") &&
      !sessionStorage.getItem("preloaderShown");

    const shouldShow = isHome ? shouldShowHomePreloader : true;

    if (shouldShow) {
      if (isHome) sessionStorage.setItem("preloaderShown", "true");

      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onFinish?.(); // ✅ fire callback after preloader finishes
      }, duration * 1000);

      return () => clearTimeout(timer);
    } else {
      onFinish?.(); // ✅ immediately trigger if preloader is skipped
    }
  }, [pathname, duration, isHome, onFinish]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={styles.preloaderContainer}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            delay: duration,
          }}
        >
          <AnimatedLogo
            logoName="OR.svg"
            size={100}
            strokeColor="#a3b6bd"
            fillColor="#a2b5bb"
            strokeWidth={2}
            animateFill
            className={styles.logo}
            highRes={true}
            {...logoProps}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoPreloader;
export default LogoPreloader;
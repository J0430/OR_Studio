import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./ScrollShadow.module.scss";
import { useTheme } from "next-themes";

const ScrollShadow = ({ children, className = "" }) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    setShowTopShadow(scrollTop > 10);
    setShowBottomShadow(scrollTop + clientHeight < scrollHeight - 10);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.scrollShadow} ${className}`}
      data-theme={theme}>
      <motion.div
        className={`${styles.topShadow} ${showTopShadow ? styles.topShadowVisible : ""}`}
        animate={{ opacity: showTopShadow ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      <motion.div
        className={`${styles.bottomShadow} ${showBottomShadow ? styles.bottomShadowVisible : ""}`}
        animate={{ opacity: showBottomShadow ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      {children}
    </div>
  );
};

export default ScrollShadow;

// ============================================================
// ⚛️ LogoTransition.tsx — Animated-to-Static Logo Transition
// ============================================================

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatedLogo } from "./AnimatedLogo";
import styles from "./LogoTransition.module.scss";

interface LogoTransitionProps {
  size?: number;
  strokeWidth?: number;
  staticLogoSrc: string;
  className?: string;
}

const LogoTransition = ({
  size = 125,
  strokeWidth = 1,
  staticLogoSrc,
  className = "",
}: LogoTransitionProps) => {
  const [showStatic, setShowStatic] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStatic(true);
    }, 2500); // Match AnimatedLogo autoFadeOut delay (2s animation + 0.5s buffer)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.logoTransitionWrapper} ${className}`}>
      {!showStatic && (
        <AnimatedLogo
          size={size}
          strokeWidth={strokeWidth}
          autoFadeOut={true}
        />
      )}
      {showStatic && (
        <Image
          src={staticLogoSrc}
          alt="OR Studio Logo"
          width={size}
          height={size * 1.2}
          className={styles.staticLogo}
          priority
        />
      )}
    </div>
  );
};

export default LogoTransition;

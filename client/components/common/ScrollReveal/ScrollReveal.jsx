import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

/**
 * ScrollReveal component for animating children on scroll.
 *
 * @param {ReactNode} children - Elements to animate.
 * @param {number} delay - Delay before animation starts (default: 0.2s).
 * @param {number} duration - Duration of the animation (default: 0.6s).
 * @param {string} direction - Direction to slide in from ("top", "bottom", "left", "right").
 * @param {boolean} disabled - Disable the animation (default: false).
 * @param {Array} customTransition - Optional custom transition override.
 * @param {string} ease - Easing function (default: "easeOut").
 */
const ScrollReveal = ({
  children,
  delay = 0.2,
  duration = 0.6,
  direction = "bottom",
  disabled = false,
  customTransition = null,
  ease = "easeOut",
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2, // Trigger when 20% visible
  });

  // Start animation when in view
  useEffect(() => {
    if (inView && !disabled) {
      controls.start("visible");
    }
  }, [controls, inView, disabled]);

  // Handle different directions
  const getOffset = () => {
    const offset = 50;
    switch (direction) {
      case "top":
        return { y: -offset, x: 0 };
      case "bottom":
        return { y: offset, x: 0 };
      case "left":
        return { x: -offset, y: 0 };
      case "right":
        return { x: offset, y: 0 };
      default:
        return { y: offset, x: 0 }; // Default to bottom
    }
  };

  // Animation variants
  const variants = {
    hidden: { opacity: 0, ...getOffset() },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: customTransition || { duration, delay, ease },
    },
  };

  if (disabled) return <>{children}</>; // Render directly if disabled

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}>
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

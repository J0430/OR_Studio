import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const ScrollReveal = ({ children, delay = 0.2, duration = 0.6 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Animate only once
    threshold: 0.2, // Trigger when 20% of the element is visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: "easeOut" },
    },
  };

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

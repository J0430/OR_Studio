import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SectionWrapper = ({ id, children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0, // 30% of section in viewport to trigger
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 100 }} // Start hidden and below
      animate={inView ? { opacity: 1, y: 0 } : {}} // Animate when in view
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
      style={{ height: "100dvh" }}>
      {children}
    </motion.section>
  );
};

export default SectionWrapper;

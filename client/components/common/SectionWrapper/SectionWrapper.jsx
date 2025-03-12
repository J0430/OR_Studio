import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SectionWrapper = ({ id, children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Animate only once per section
    threshold: 0.3, // 30% of section in viewport to trigger
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 80 }} // Start hidden and below
      animate={inView ? { opacity: 1, y: 0 } : {}} // Animate when in view
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;

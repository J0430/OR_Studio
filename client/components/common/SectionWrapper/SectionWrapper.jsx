import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SectionWrapper = ({ id, children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 1,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 100 } : { opacity: 1, y: 100 }}
      transition={{ duration: 0.1, ease: "easeOut" }}>
      {children}
    </motion.section>
  );
};

export default SectionWrapper;

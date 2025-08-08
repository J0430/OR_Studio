import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SectionWrapper = ({ id, children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3, // 30% in view is enough
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}} // ✅ Proper reveal
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
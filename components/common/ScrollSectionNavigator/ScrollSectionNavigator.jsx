import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import styles from "./ScrollSectionNavigation.module.scss";

const ScrollSectionNavigation = ({ sections = [] }) => {
  const [activeId, setActiveId] = useState(sections[0]);
  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const current = entry.target.id;
          if (current && current !== activeId) {
            setActiveId(current);
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, options);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections, activeId]);

  const scrollTo = (targetId) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentIndex = sections.indexOf(activeId);
  const prevId = sections[currentIndex - 1];
  const nextId = sections[currentIndex + 1];

  return (
    <div
      className={styles.scrollNavWrapper}
      role="navigation"
      aria-label="Scroll Section Navigation">
      <div className={styles.scrollNavDots}>
        <AnimatePresence initial={false}>
          {prevId && (
            <motion.div
              key={`prev-${prevId}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 5, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`${styles.dotWrapper} ${styles.inactive}`}
              aria-hidden="true">
              <button className={styles.dot} onClick={() => scrollTo(prevId)}>
                {String(sections.indexOf(prevId) + 1).padStart(2, "0")}
              </button>
            </motion.div>
          )}

          <motion.div
            key={`active-${activeId}`}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`${styles.dotWrapper} ${styles.active}`}>
            <button
              className={styles.dot}
              onClick={() => scrollTo(activeId)}
              aria-label={`Go to section ${currentIndex + 1}`}
              aria-current="true">
              {String(currentIndex + 1).padStart(2, "0")}
            </button>
            <motion.div layoutId="dot-line" className={styles.dotLine} />
          </motion.div>

          {nextId && (
            <motion.div
              key={`next-${nextId}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.4, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`${styles.dotWrapper} ${styles.inactive}`}
              aria-hidden="true">
              <button className={styles.dot} onClick={() => scrollTo(nextId)}>
                {String(sections.indexOf(nextId) + 1).padStart(2, "0")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

ScrollSectionNavigation.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ScrollSectionNavigation;

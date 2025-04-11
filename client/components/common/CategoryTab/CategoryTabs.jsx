import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./CategoryTabs.module.scss";

const CategoryTabs = ({ categories, selectedCategory, onCategorySelect }) => {
  const [highlightProps, setHighlightProps] = useState({
    left: 0,
    width: 0,
    visible: false,
  });
  const tabsRef = useRef([]);

  // Update highlight pill on selection
  useEffect(() => {
    const activeIndex = categories?.findIndex(
      (cat) => cat === selectedCategory
    );
    if (tabsRef.current[activeIndex]) {
      const tab = tabsRef.current[activeIndex];
      const { offsetLeft, offsetWidth } = tab;

      setHighlightProps({
        left: offsetLeft,
        width: offsetWidth,
        visible: true,
      });
    }
  }, [selectedCategory, categories]);

  return (
    <div className={styles.tabsWrapper}>
      {/* ✅ Animated highlight pill */}
      {highlightProps.visible && (
        <motion.div
          className={styles.highlight}
          animate={{
            left: highlightProps.left,
            width: highlightProps.width,
            opacity: 1,
          }}
          initial={{ opacity: 0 }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
        />
      )}

      {/* ✅ Render each category tab */}
      {categories?.map((category, index) => (
        <button
          key={category}
          ref={(el) => (tabsRef.current[index] = el)}
          className={`${styles.categoryTab} ${
            selectedCategory === category ? styles.active : ""
          }`}
          onClick={() => onCategorySelect(category)}
          aria-label={`Filter by ${category}`}>
          <span>{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;

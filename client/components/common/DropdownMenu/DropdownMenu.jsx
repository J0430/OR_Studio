import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowDownSLine } from "react-icons/ri";
import styles from "../DropdownMenu/DropdownMenu.module.scss";

const DropdownMenu = ({
  categories = [],
  selectedCategory,
  onCategorySelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(
    selectedCategory || categories[0] || ""
  );

  // ✅ Update internal state if parent updates selectedCategory
  useEffect(() => {
    setCurrentSelection(selectedCategory || categories[0] || "");
  }, [selectedCategory, categories]);

  return (
    <div className={styles.dropdownContainer}>
      {/* ✅ Custom Dropdown Button */}
      <motion.button
        type="button"
        className={styles.dropdownButton}
        onClick={() => setIsOpen((prev) => !prev)}
        whileTap={{ scale: 0.95 }}
        aria-expanded={isOpen}
        aria-haspopup="listbox">
        <div className={styles.buttonContent}>
          <span className={styles.categoryText}>{currentSelection}</span>
          {/* ✅ Animated Arrow */}
          <motion.span
            className={styles.arrow}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            <RiArrowDownSLine />
          </motion.span>
        </div>
      </motion.button>

      {/* ✅ Dropdown Options List */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={styles.dropdownContent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            role="listbox">
            {categories.map((category) => (
              <motion.li
                key={category}
                className={`${styles.dropdownItem} ${
                  currentSelection === category ? styles.activeItem : ""
                }`}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                onClick={() => {
                  setCurrentSelection(category);
                  onCategorySelect(category);
                  setIsOpen(false); // Close menu after selection
                }}
                role="option"
                aria-selected={currentSelection === category}>
                {category}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Add AnimatePresence for smooth exit
import { RiArrowDownSLine } from "react-icons/ri"; // Arrow icon
import styles from "./DropdownMenu.module.scss";

const DropdownMenu = ({ categories, selectedCategory, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.dropdownContainer}>
      {/* Dropdown Button */}
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        <div className={styles.buttonContent}>
          <span className={styles.categoryText}>
            {selectedCategory || "Select Category"}
          </span>

          {/* Arrow Animation */}
          <motion.span
            className={styles.arrow}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            <RiArrowDownSLine />
          </motion.span>
        </div>
      </button>

      {/* Dropdown List Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdownContent}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}>
            {categories.map((category, index) => (
              <div
                key={index}
                className={`${styles.dropdownItem} ${
                  selectedCategory === category ? styles.activeItem : ""
                }`}
                onClick={() => {
                  onCategorySelect(category);
                  setIsOpen(false);
                }}>
                {category}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;

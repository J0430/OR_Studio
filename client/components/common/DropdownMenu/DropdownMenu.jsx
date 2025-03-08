import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowDownSLine } from "react-icons/ri";
import styles from "../DropdownMenu/DropdownMenu.module.scss";

const DropdownMenu = ({ categories, selectedCategory, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdownContainer}>
      {/* Dropdown Button */}
      <motion.button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}>
        <div className={styles.buttonContent}>
          <span className={styles.categoryText}>
            {selectedCategory || "Works"}
          </span>
          {/* ✅ Animated Arrow */}
          <motion.span
            className={styles.arrow}
            animate={{ rotate: isOpen ? 180 : 0 }} // ✅ Rotate when open
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            <RiArrowDownSLine />
          </motion.span>
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdownContent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6 }}>
            {categories.map((category) => (
              <motion.div
                key={category}
                className={`${styles.dropdownItem} ${
                  selectedCategory === category ? styles.activeItem : ""
                }`}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                onClick={() => {
                  onCategorySelect(category);
                  setIsOpen(false);
                }}>
                {category}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;

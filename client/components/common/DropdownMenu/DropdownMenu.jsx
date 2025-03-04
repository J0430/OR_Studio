import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../DropdownMenu/DropdownMenu.module.scss";

const DropdownMenu = ({
  arrowDirection,
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdownContainer}>
      {/* Dropdown Button */}
      <motion.button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}>
        <span className={styles.categoryText}>{selectedCategory || "All"}</span>
        <span
          className={
            arrowDirection == "up" ? styles.arrowUp : styles.arrowIcon
          }>
          &#8964;
        </span>
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
                className={styles.dropdownItem}
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

import { useState } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { RiArrowDownSLine } from "react-icons/ri"; // Import arrow icon from react-icons
import styles from "./DropdownMenu.module.scss";

const DropdownMenu = ({ categories, selectedCategory, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdownContainer}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        <div className={styles.buttonContent}>
          <span className={styles.categoryText}>
            {selectedCategory || "Select Category"}
          </span>

          {/* Animated arrow icon */}
          <motion.span
            className={styles.arrow}
            animate={{ rotate: isOpen ? 180 : 0 }} // Rotate when dropdown is open
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            <RiArrowDownSLine />
          </motion.span>
        </div>
      </button>

      {isOpen && (
        <div className={styles.dropdownContent}>
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
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

// DropdownMenu.tsx:

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowDownSLine } from "react-icons/ri";
import type { DropdownMenuProps } from "./DropdownMenu.types"; // ✅ imported from correct file
import styles from "./DropdownMenu.module.scss";

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={styles.dropdownContainer}
      ref={dropdownRef}
      aria-label="Category Selector">
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="category-list">
        <div className={styles.buttonContent}>
          <motion.span className={styles.categoryText}>
            {selectedCategory}
          </motion.span>
          <motion.span
            className={styles.arrow}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            <RiArrowDownSLine />
          </motion.span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id="category-list"
            className={styles.dropdownContent}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            role="listbox">
            {categories.map((category) => (
              <li
                key={category}
                role="option"
                aria-selected={selectedCategory === category}
                className={`${styles.dropdownItem} ${
                  selectedCategory === category ? styles.activeItem : ""
                }`}
                onClick={() => {
                  onCategorySelect(category);
                  setIsOpen(false);
                }}>
                {category}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default DropdownMenu;

// components/Header/Header.tsx

import { useState, ReactNode } from "react";
import { HeaderProps } from "./Header.types";
import styles from "./Header.module.scss";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC<HeaderProps> = ({
  logo,
  ToggleButton,
  children,
}) => {
  // State to track menu open/closed
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu open or closed
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Optional: function to close the menu (e.g. on link click)
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      {/* Logo Section */}
      <div className={styles.logo}>{logo}</div>

      {/* Menu Toggle Button */}
      <button
        type="button"
        className={styles.toggleButton}
        onClick={handleToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="primary-navigation">
        {ToggleButton}
      </button>

      {/* Navigation Links Slot (collapsible) */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.nav
            key="nav"
            id="primary-navigation"
            className={styles.nav}
            role="navigation"
            aria-label="Primary Navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}>
            {/* Render any children passed to Header (e.g., <NavbarLinks/>) */}
            {children && <div onClick={closeMenu}>{children}</div>}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

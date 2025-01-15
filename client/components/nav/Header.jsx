"use client";

import React, { useState, useEffect, useRef } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavbarLinks from "./NavLinks";
import useTimeout from "../../hooks/useTimeout";
import styles from "./Header.module.scss";
import { Logos } from "../../globals/globals";

function Header() {
  const isTimerDone = useTimeout(4000); // Ensure this is correctly imported and functional
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogoClick = () => {
    setIsOpen(false);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className={isTimerDone ? styles.navbar : styles.noNavbar}>
      {/* Logo */}
      <div onClick={handleLogoClick}>
        <Link href="/">
          <Image
            src={Logos[2]}
            alt="OR Studio Logo"
            className={styles.logo}
            width={50}
            height={50}
          />
        </Link>
      </div>

      {/* Menu Toggle Button */}
      <div className={styles.actions}>
        <motion.button
          aria-label="Open navigation menu"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}>
          <MenuOutlined />
        </motion.button>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className={styles.menuOverlay}>
            <motion.button
              aria-label="Close navigation menu"
              whileHover={{ scale: 1.2 }}
              className={styles.closeButton}
              onClick={handleCloseMenu}>
              <CloseOutlined />
            </motion.button>
            <NavbarLinks isOpen={isOpen} setIsOpen={setIsOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;

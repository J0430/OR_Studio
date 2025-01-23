"use client";

import React, { useState, useRef } from "react";
import { useClickOutside } from "hooks/useClickOuside";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Logos } from "../../globals/globals";
import { usePreloader } from "contexts/PreloaderContext";
import useTimeout from "hooks/useTimeout";
import Image from "next/image";
import Link from "next/link";
import NavbarLinks from "./NavLinks";
import styles from "./Header.module.scss";

function Header() {
  const { isPreloaderVisible } = usePreloader();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useClickOutside(menuRef, () => setIsOpen(false));

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return !isPreloaderVisible ? (
    <header className={styles.navbar}>
      <div onClick={() => setIsOpen(false)} className={styles.logoContainer}>
        <Link href="/" passHref>
          <Image
            src={Logos[2]}
            alt="OR Studio Logo"
            className={styles.logo}
            width={70}
            height={70}
          />
        </Link>
      </div>

      {/* Menu Button */}
      <motion.button
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className={styles.menuButton}
        onClick={toggleMenu}>
        {isOpen ? <CloseOutlined /> : <MenuOutlined />}
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            ref={menuRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className={styles.menuOverlay}>
            <NavbarLinks setIsOpen={setIsOpen} />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  ) : null;
}

export default Header;

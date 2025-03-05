import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useNav } from "@contexts/NavContext";
import { usePreloader } from "@contexts/MainPreloaderContext";
import { motion, AnimatePresence } from "framer-motion";
import { logos } from "@utils/globals";
import useClickOutside from "hooks/useClickOuside";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";

const NavbarLinks = dynamic(() => import("../NavLinks/NavLinks"), {
  loading: () => <div>Loading Modal...</div>,
  ssr: false,
});
const CloseOutlined = dynamic(() => import("@ant-design/icons/CloseOutlined"), {
  ssr: false,
});
const MenuOutlined = dynamic(() => import("@ant-design/icons/MenuOutlined"), {
  ssr: false,
});

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { isNavOpen, setIsNavOpen } = useNav();
  const { isPreloaderVisible = false } = usePreloader();

  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setIsNavOpen(false));

  if (isPreloaderVisible) return null;

  return (
    <motion.div
      className={styles.navbar}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className={styles.navContent}>
        <Link href="/" passHref>
          <Image
            src={logos[3]}
            alt="OR Studio Logo"
            className={styles.logo}
            width={isMobile ? 25 : 40}
            height={isMobile ? 30 : 45}
            priority
            onClick={() => setIsNavOpen(false)}
          />
        </Link>
        <motion.button
          aria-label="Toggle navigation menu"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`${styles.menuButton} ${isNavOpen ? styles.hidden : ""}`}
          onClick={() => setIsNavOpen((prev) => !prev)}>
          {!isNavOpen ? (
            <MenuOutlined key="menu" style={{ fontSize: isMobile ? 23 : 40 }} />
          ) : null}
        </motion.button>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.nav
            ref={menuRef}
            initial={{ opacity: 0, y: "100%" }} // ✅ Opens from bottom to top
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className={styles.menuOverlay}>
            {/* Close Button (X) - Now Always Visible */}
            <motion.button
              className={styles.closeButton}
              onClick={() => setIsNavOpen(false)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}>
              <CloseOutlined key="close" />
            </motion.button>

            <NavbarLinks />
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;

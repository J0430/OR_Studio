import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import { useNav } from "@contexts/NavContext";
import { usePreloader } from "@contexts/MainPreloaderContext";
import { logos } from "@utils/globals";
import HamburgerMenu from "@components/common/HamburgerMenu/HamburgerMenu";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";

const NavbarLinks = dynamic(() => import("../NavbarLinks/NavbarLinks"), {
  loading: () => <div>Loading Menu...</div>,
  ssr: false,
});

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { isNavOpen, setIsNavOpen } = useNav();
  const { isPreloaderVisible = false } = usePreloader();
  const navRef = useRef(null);

  // 🔁 ESC key to close nav
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isNavOpen) setIsNavOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isNavOpen, setIsNavOpen]);

  // ❌ Don't render while preloader is active
  if (isPreloaderVisible) return null;

  return (
    <motion.header
      className={styles.navbar}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}>
      {/* 🔍 Logo hidden when menu is open */}

      <Link href="/" passHref>
        <Image
          src={logos[3]}
          alt="OR Studio Logo"
          className={`${styles.logo} ${isNavOpen ? styles.logoHidden : ""}`}
          width={isMobile ? 25 : 38}
          height={isMobile ? 30 : 43}
          priority
          onClick={() => setIsNavOpen(false)}
        />
      </Link>

      {/* 🍔 Hamburger button */}
      <HamburgerMenu
        isOpen={isNavOpen}
        onToggle={() => setIsNavOpen((prev) => !prev)}
        aria-controls="main-navigation"
        aria-expanded={isNavOpen}
      />

      {/* 🧠 Animated Fullscreen Nav */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.nav
            id="main-navigation"
            ref={navRef}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className={styles.menuOverlay}>
            <NavbarLinks />
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

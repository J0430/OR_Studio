import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import { useNav } from "@contexts/NavContext";
import { usePreloaderContext } from "@contexts/PreloaderContext";
import { dynamicImportComponents } from "utils/dynamicImportComponents";
import Link from "next/link";
import styles from "./Header.module.scss";

// Dynamic imports
const { HamburgerToggleButton, AnimatedLogo } = dynamicImportComponents(
  "common",
  ["HamburgerToggleButton", "AnimatedLogo"]
);
const { NavbarLinks } = dynamicImportComponents("nav", ["NavbarLinks"]);

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { isNavOpen, setIsNavOpen, pathname } = useNav();
  const { isPreloaderVisible } = usePreloaderContext();
  const navRef = useRef(null);

  // ESC key closes nav
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isNavOpen) setIsNavOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isNavOpen, setIsNavOpen]);

  if (isPreloaderVisible) return null;

  return (
    <motion.header
      className={styles.navbar}
      data-page={pathname === "/works" ? "works" : undefined}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}>
      {/* ✅ Show logo only when nav is closed */}
      <div className={styles.logo}>
        {!isNavOpen && (
          <Link href="/" passHref>
            <AnimatedLogo
              strokeColor="#fffc"
              size={isMobile ? 50 : 60}
              priority
            />
          </Link>
        )}
      </div>

      <HamburgerToggleButton
        isOpen={isNavOpen}
        onToggle={() => setIsNavOpen((prev) => !prev)}
        gapBetweenLines={10}
        lineWidth={isMobile ? 25 : 30}
        aria-expanded={isNavOpen}
        aria-controls="main-navigation"
      />

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

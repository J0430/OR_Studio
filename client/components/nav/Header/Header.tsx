import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import { useNav } from "@contexts/NavContext";
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
  const [strokeColor, setStrokeColor] = useState("#ffffff");
  const router = useRouter();
  const formattedPath = router.pathname
    .replace("/", "")
    .replace(/^./, (char) => char.toUpperCase());
  const navRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isNavOpen) setIsNavOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isNavOpen, setIsNavOpen]);

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
              logoName="OR.svg"
              strokeColor={strokeColor}
              size={60}
              highRes={true}
              priority
            />
          </Link>
        )}
      </div>

      <motion.div className={styles.leftSide}>
        {/* <motion.div className={styles.page}> * */}
        {/* <h1>{!router.pathname === "/work" ? "" : formattedPath}</h1> */}

        <HamburgerToggleButton
          isOpen={isNavOpen}
          onToggle={() => setIsNavOpen((prev) => !prev)}
          gapBetweenLines={isMobile ? 8 : 10}
          lineWidth={isMobile ? 22 : 30}
          aria-expanded={isNavOpen}
          aria-controls="main-navigation"
        />
      </motion.div>
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

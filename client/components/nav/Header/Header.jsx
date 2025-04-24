import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import { usePageContext, PageContextProvider } from "@contexts/Context";
import { logos } from "@utils/globals";
import { loadDynamicImports } from "@utils/loadDynamicImports";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "../Header/Header.module.scss";

const { HamburgerToggleButton, AnimatedLogo } = loadDynamicImports("common", [
  "HamburgerToggleButton",
  "AnimatedLogo",
]);
const { NavbarLinks } = loadDynamicImports("nav", ["NavbarLinks"]);

console.log(
  "HamburgerToggleButton",
  HamburgerToggleButton,
  "NavbarLinks",
  NavbarLinks
);
const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isNavOpen) setIsNavOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isNavOpen, setIsNavOpen]);
  // Close nav on route change
  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  // Function to toggle nav
  const toggleNav = () => setIsNavOpen((prev) => !prev);

  return (
    <motion.header
      className={styles.navbar}
      data-page={pathname === "/works" ? "works" : undefined}
      // Smooth exit animation for header
    >
      <motion.div className={styles.logo}>
        <Link href="/" passHref>
          <AnimatedLogo
            strokeColor="#fffc"
            size={isMobile ? 50 : 60}
            priority
          />
        </Link>
      </motion.div>

      <HamburgerToggleButton
        isOpen={isNavOpen}
        onToggle={toggleNav}
        gapBetweenLines={10}
        lineWidth={30}
        aria-expanded={isNavOpen}
        aria-controls="main-navigation"
      />

      <AnimatePresence>
        {isNavOpen && (
          <motion.nav
            id="main-navigation"
            className={styles.menuOverlay}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "100%" }} // Subtle exit animation for menu
            transition={{ duration: 1.2, ease: "easeInOut" }}>
            <NavbarLinks setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} />
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
export default Header;

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
import HamburgerToggleButton from "@components/common/HamburgerToggleButton/HamburgerToggleButton";
import NavbarLinks from "@components/nav/NavbarLinks/NavbarLinks";
import dynamic from "next/dynamic";
import AnimatedLogo from "@components/common/AnimatedLogo/AnimatedLogo";
// for default exports

// const { HamburgerToggleButton } = loadDynamicImports("common", [
//   "HamburgerToggleButton",
// ]);
// const { NavbarLinks } = loadDynamicImports("nav", ["NavbarLinks"]);
// const AnimatedLogo = dynamic(
//   () => import("@components/common/AnimatedLogo/AnimatedLogo")
// );
// const NavbarLinks = dynamic(() =>
//   import("@components/nav/NavbarLinks/NavbarLinks").then(
//     (mod) => mod.NavbarLinks
//   )
// );
// const HamburgerToggleButton = dynamic(() =>
//   import("@components/common/HamburgerToggleButton/HamburgerToggleButton").then(
//     (mod) => mod.default || mod.HamburgerToggleButton
//   )
// );
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

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import { dynamicImportComponents } from "utils/dynamicImportComponents";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";

import { usePreloaderContext } from "@contexts/PreloaderContext"; // ✅ Import context

import type { FC, KeyboardEvent } from "react";

// Dynamic imports
const { HamburgerToggleButton, AnimatedLogo } = dynamicImportComponents(
  "common",
  ["HamburgerToggleButton", "AnimatedLogo"]
);
const { NavbarLinks } = dynamicImportComponents("nav", ["NavbarLinks"]);

const Header: FC = () => {
  const { isPreloaderVisible } = usePreloaderContext();
  if (isPreloaderVisible) return null;
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const pathname = usePathname();
  console.log("Rendering Header. Preloader visible?", "Loca");

  // ✅ Don't render at all if preloader is visible
  if (isPreloaderVisible) return null;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent<Document>) => {
      if (e.key === "Escape" && isNavOpen) setIsNavOpen(false);
    };
    document.addEventListener("keydown", handleEsc as any);
    return () => document.removeEventListener("keydown", handleEsc as any);
  }, [isNavOpen]);

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  const toggleNav = () => setIsNavOpen((prev) => !prev);

  return (
    <motion.header
      className={styles.navbar}
      data-page={pathname === "/works" ? "works" : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}>
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
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}>
            <NavbarLinks setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} />
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

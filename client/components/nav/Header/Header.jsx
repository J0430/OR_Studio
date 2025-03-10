import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import { useNav } from "@contexts/NavContext";
import { usePreloader } from "@contexts/MainPreloaderContext";
import { logos } from "@utils/globals";
import HamburgerMenu from "@components/common/HamburgerMenu/HamburgerMenu";
import useClickOutside from "hooks/useClickOuside";
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

  if (isPreloaderVisible) return null;

  return (
    <motion.div
      className={styles.navbar}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}>
      <div className={styles.navGhostContainer}>
        <div className={styles.navContent}>
          <Link href="/" passHref>
            <Image
              src={logos[3]}
              alt="OR Studio Logo"
              className={styles.logo}
              width={isMobile ? 28 : 38}
              height={isMobile ? 33 : 43}
              priority
              onClick={() => setIsNavOpen(false)}
            />
          </Link>

          {/* ✅ Hamburger Button Controls Everything */}
          <HamburgerMenu
            isOpen={isNavOpen}
            onToggle={() => setIsNavOpen((prev) => !prev)}
          />
        </div>
      </div>

      {/* ✅ Menu Overlay */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.nav
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className={styles.menuOverlay}>
            <NavbarLinks />
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;

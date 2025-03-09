import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import { useNav } from "@contexts/NavContext";
import { usePreloader } from "@contexts/MainPreloaderContext";
import { logos } from "@utils/globals";
import useClickOutside from "hooks/useClickOuside";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";

const NavbarLinks = dynamic(() => import("../NavbarLinks/NavbarLinks"), {
  loading: () => <div>Loading Menu...</div>,
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
      transition={{ duration: 0.1 }}>
      {/* ✅ Ghost container (allows clicks to pass through) */}
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

          <motion.button
            aria-label="Toggle navigation menu"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`${styles.menuButton} ${isNavOpen ? styles.hidden : ""}`}
            onClick={() => setIsNavOpen((prev) => !prev)}>
            {!isNavOpen ? (
              <MenuOutlined
                key="menu"
                style={{ fontSize: isMobile ? 25 : 32 }}
              />
            ) : null}
          </motion.button>
        </div>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.nav
            ref={menuRef}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className={styles.menuOverlay}>
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

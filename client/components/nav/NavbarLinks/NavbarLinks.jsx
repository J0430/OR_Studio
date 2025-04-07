import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useNav } from "@contexts/NavContext";
import Link from "next/link";
import styles from "./NavbarLinks.module.scss";

/* =========================== */
/* ✅ Animation Variants       */
/* =========================== */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const NavbarLinks = () => {
  const pathname = usePathname();
  const { setIsNavOpen } = useNav();
  const navRef = useRef(null);
  const links = ["Home", "Works", "Contact", "About"];

  // 🔁 ESC key to close nav
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsNavOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [setIsNavOpen]);

  return (
    <motion.nav
      ref={navRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.navContainer}
      role="navigation"
      aria-label="Main navigation">
      <motion.ul className={styles.navList}>
        {links.map((link) => {
          const href = link === "Home" ? "/" : `/${link.toLowerCase()}`;
          const isActive = pathname === href;

          return (
            <motion.li
              key={link}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}>
              <Link
                href={href}
                scroll={false}
                className={styles.navLink}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsNavOpen(false)}>
                {link}
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.nav>
  );
};

export default NavbarLinks;

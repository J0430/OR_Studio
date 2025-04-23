import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "../NavbarLinks/NavbarLinks.module.scss";

// Define the container variants for entrance and exit animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const links = ["Home", "Works", "Contact", "About"];

const NavbarLinks = ({ setIsNavOpen, isNavOpen }) => {
  const pathname = usePathname();

  return (
    <motion.ul
      className={styles.navList}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Add exit for smooth fade-out effect
    >
      {links.map((link, index) => {
        const href = link === "Home" ? "/" : `/${link.toLowerCase()}`;
        const isActive = pathname === href;

        return (
          <motion.li
            key={link}
            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            variants={itemVariants}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}>
            <Link
              href={href}
              scroll={false}
              className={styles.navLink}
              onClick={() => setIsNavOpen(!isNavOpen)}
              aria-current={isActive ? "page" : undefined}>
              {link}
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};
export default NavbarLinks;

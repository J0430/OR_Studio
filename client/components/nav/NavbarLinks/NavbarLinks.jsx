import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useNav } from "@contexts/NavContext";
import Link from "next/link";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./NavbarLinks.module.scss";

const NavbarLinks = () => {
  const pathname = usePathname();
  const { setIsNavOpen } = useNav(); // ✅ Ensure menu closes when clicking a link

  const links = ["Home", "Works", "Contact", "About"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.navContainer}>
      {/* ✅ Close Button */}
      <motion.button
        className={styles.closeButton}
        onClick={() => setIsNavOpen(false)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}>
        <CloseOutlined key="close" />
      </motion.button>

      {/* ✅ Navigation Links (Now Clickable) */}
      <motion.ul className={styles.navList}>
        {links.map((link, index) => {
          const href = link === "Home" ? "/" : `/${link.toLowerCase()}`;
          const isActive = pathname === href;

          return (
            <motion.li
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}>
              <Link
                href={href}
                scroll={false}
                className={styles.navLink}
                onClick={() => setIsNavOpen(false)}>
                {" "}
                {/* ✅ Clicking closes menu */}
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

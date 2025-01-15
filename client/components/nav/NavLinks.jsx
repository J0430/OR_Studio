import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./NavLinks.module.scss";

const NavbarLinks = ({ setIsOpen }) => {
  const links = ["Home", "Projects", "Contact", "Services", "About"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // Increased delay between animations for slower effect
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Start further down for a more pronounced motion
    visible: {
      opacity: 1,
      y: 0, // Animates to the original position
      transition: { duration: 0.8 }, // Slower individual animations
    },
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.navContainer}>
      <motion.ul className={styles.navList}>
        {links.map((link, index) => (
          <motion.li
            key={index}
            variants={itemVariants} // Apply the animation for each link
            whileHover={{ scale: 1.1 }} // Slightly scale on hover
            whileTap={{ scale: 0.9 }} // Shrink slightly on tap
            className={styles.navItem}>
            <Link
              href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}>
              {link}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
};

export default NavbarLinks;

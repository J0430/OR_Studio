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

  const links = ["Home", "Works", "Contact", "About"];

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.navContainer}
      role="navigation" // ✅ Optional but good for semantics
    >
      <motion.ul className={styles.navList}>
        {links.map((link) => {
          const href = link === "Home" ? "/" : `/${link.toLowerCase()}`;
          const isActive = pathname === href;

          return (
            <motion.li
              key={link} // ✅ Better than index
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}>
              <Link
                href={href}
                scroll={false}
                className={styles.navLink}
                aria-current={isActive ? "page" : undefined} // ✅ For accessibility
                onClick={() => setIsNavOpen(false)} // ✅ Close menu on click
              >
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

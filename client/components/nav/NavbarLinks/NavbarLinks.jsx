import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useNav } from "@contexts/NavContext";
import styles from "./NavbarLinks.module.scss";

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

const NavbarLinks = () => {
  const pathname = usePathname();
  const { setIsNavOpen } = useNav();
  console.log(pathname);

  return (
    <motion.ul
      className={styles.navList}
      variants={containerVariants}
      initial="hidden"
      animate="visible">
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
              onClick={() => setIsNavOpen(false)}
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

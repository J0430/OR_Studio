import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NavbarLinksProps } from "./NavbarLinks.types";
import styles from "./NavbarLinks.module.scss";

export const NavbarLinks: React.FC<NavbarLinksProps> = ({
  links,
  onLinkClick,
}) => {
  // Get current path to determine active link (Next.js App Router)
  const pathname = usePathname();

  // Framer Motion variants for the list container and items
  const listVariants = {
    closed: {
      transition: { staggerChildren: 0.1, staggerDirection: -1 }, // stagger out
    },
    open: {
      transition: { staggerChildren: 0.1, staggerDirection: 1 }, // stagger in
    },
  };
  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.ul
      className={styles.navList}
      initial="closed"
      animate="open"
      exit="closed"
      variants={listVariants}>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <motion.li
            key={link.href}
            className={styles.navListItem}
            variants={itemVariants}>
            <Link
              href={link.href}
              className={`${styles.navLink} ${isActive ? styles.activeLink : ""}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                // If an onLinkClick callback is provided, call it
                onLinkClick?.(link);
              }}>
              {link.label}
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./NavbarLinks.module.scss";
import type { NavbarLinksProps } from "./NavbarLinks.types";

const links = ["Home", "Works", "Contact", "About"];

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

const NavbarLinks: React.FC<NavbarLinksProps> = ({
  setIsNavOpen,
  isNavOpen,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (href: string, isActive: boolean, link: string) => {
    if (isActive && link === "Home") {
      // Bypass preloader manually
      sessionStorage.setItem("preloaderShown", "true");

      // App router: re-push to same route to trigger scroll without reloading
      router.push(href);
    }

    // Toggle navigation if needed
    setIsNavOpen(!isNavOpen);
  };

  return (
    <motion.ul
      className={styles.navList}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden">
      {links.map((link) => {
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
              onClick={(e) => {
                if (isActive && link === "Home") {
                  e.preventDefault();
                  handleClick(href, isActive, link);
                } else {
                  setIsNavOpen(!isNavOpen);
                }
              }}
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

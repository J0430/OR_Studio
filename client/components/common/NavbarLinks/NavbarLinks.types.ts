// components/NavbarLinks/NavbarLinks.types.ts

/** Data type for a single navigation link */
export interface NavLink {
  label: string;
  href: string;
}

/** Props for the NavbarLinks component */
export interface NavbarLinksProps {
  /** Array of navigation links to display */
  links: NavLink[];
  /** Optional callback when a link is clicked (e.g., to close a menu or handle tracking) */
  onLinkClick?: (link: NavLink) => void;
}

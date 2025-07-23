//Header.types.ts
import { ReactNode } from "react";
/** Props for the Header component */
export interface HeaderProps {
  /** Logo element to display (e.g. an <img> or <span> with text) */
  logo: ReactNode;
  /** Toggle button element (icon or component) to trigger menu open/close */
  ToggleButton: ReactNode;
  /** Navigation content to display inside the header (e.g. <NavbarLinks /> component) */
  children?: ReactNode;
}

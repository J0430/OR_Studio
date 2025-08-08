import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { NavContextState } from "./NavContext.types";

// Create context with undefined initial value
const NavContext = createContext<NavContextState | undefined>(undefined);

// Provider
export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // Auto-close nav on route change
  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  const toggleNav = () => setIsNavOpen((prev) => !prev);

  const contextValue: NavContextState = {
    isNavOpen,
    setIsNavOpen,
    toggleNav,
    pathname,
  };

  return (
    <NavContext.Provider value={contextValue}>{children}</NavContext.Provider>
  );
};

// Hook
export const useNav = (): NavContextState => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
};

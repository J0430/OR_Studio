import React, { createContext, useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    console.log("Pathname changed:", pathname);
    setIsNavOpen(false); // Close nav on route change
  }, [pathname]);

  return (
    <NavContext.Provider value={{ isNavOpen, setIsNavOpen }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => {
  const context = useContext(NavContext);

  if (!context) {
    console.warn("useNav must be used within a NavProvider");
    return {
      isNavOpen: false,
      setIsNavOpen: () => {},
    };
  }

  return context;
};

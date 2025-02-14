"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation"; // ✅ For route change detection

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname(); // ✅ Detect route changes

  useEffect(() => {
    console.log("Pathname changed:", pathname);
    setIsNavOpen(false);
  }, [pathname]); // Re-run whenever the route changes

  return (
    <NavContext.Provider value={{ isNavOpen, setIsNavOpen }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => useContext(NavContext);

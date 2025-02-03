"use client";

import { createContext, useState, useContext } from "react";

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <NavContext.Provider value={{ isNavOpen, setIsNavOpen }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => useContext(NavContext);

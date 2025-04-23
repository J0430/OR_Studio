import React, { createContext, useState, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  // State to manage the visibility of multiple components (modal, nav, sidebar, etc.)
  const [isOpen, setIsOpen] = useState({
    modal: false,
    sidebar: false,
    nav: false,
  });

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen({ modal: false, sidebar: false, nav: false });
  }, [pathname]);

  const toggleVisibility = (component) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [component]: !prevState[component],
    }));
  };

  const closeComponent = (component) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [component]: false,
    }));
  };

  return (
    <ToggleContext.Provider
      value={{
        pathname,
        isOpen,
        toggleVisibility,
        closeComponent,
      }}>
      {children}
    </ToggleContext.Provider>
  );
};


export const useToggle = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    console.warn("useToggle must be used within a ToggleProvider");
    return {
      isOpen: { modal: false, sidebar: false, nav: false },
      toggleVisibility: () => {},
      closeComponent: () => {},
      usePathname: () => {},
    };
  }
  return context;
};

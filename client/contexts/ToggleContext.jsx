import React, { createContext, useState, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

// Create context for the toggle visibility of multiple components
const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  // State to manage the visibility of multiple components (modal, nav, sidebar, etc.)
  const [isOpen, setIsOpen] = useState({
    modal: false,
    sidebar: false,
    nav: false,
  });

  const pathname = usePathname();

  // Reset visibility on pathname change (when user navigates to a different route)
  useEffect(() => {
    setIsOpen({ modal: false, sidebar: false, nav: false });
  }, [pathname]);

  // Toggle visibility of a specific component (nav, modal, sidebar, etc.)
  const toggleVisibility = (component) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [component]: !prevState[component],
    }));
  };

  // Close a specific component
  const closeComponent = (component) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [component]: false,
    }));
  };

  return (
    <ToggleContext.Provider
      value={{
        isOpen,
        toggleVisibility,
        closeComponent,
      }}>
      {children}
    </ToggleContext.Provider>
  );
};

// Custom hook to use the ToggleContext
export const useToggle = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    console.warn("useToggle must be used within a ToggleProvider");
    return {
      isOpen: { modal: false, sidebar: false, nav: false },
      toggleVisibility: () => {},
      closeComponent: () => {},
    };
  }
  return context;
};

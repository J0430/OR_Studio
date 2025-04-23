// import React, { createContext, useState, useEffect, useContext } from "react";
// import { usePathname } from "next/navigation";

// const NavContext = createContext();

// export const NavProvider = ({ children }) => {
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const pathname = usePathname();

//   // ✅ Close Nav when changing routes
//   useEffect(() => {
//     setIsNavOpen(false);
//   }, [pathname]);

//   // ✅ Function to Toggle Navigation
//   const toggleNav = () => setIsNavOpen((prev) => !prev);

//   return (
//     <NavContext.Provider
//       value={{ isNavOpen, setIsNavOpen, toggleNav, pathname }}>
//       {children}
//     </NavContext.Provider>
//   );
// };

// export const useNav = () => {
//   const context = useContext(NavContext);
//   if (!context) {
//     console.warn("useNav must be used within a NavProvider");
//     return {
//       isNavOpen: false,
//       setIsNavOpen: () => {},
//       toggleNav: () => {},
//     };
//   }
//   return context;
// };

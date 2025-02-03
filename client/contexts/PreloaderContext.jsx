"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const PreloaderContext = createContext();

export const PreloaderProvider = ({ children }) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  useEffect(() => {
    const navigationEntry = performance.getEntriesByType("navigation")[0] || {}; // Modern API
    const navigationType =
      navigationEntry?.type ||
      window.performance?.navigation?.type ||
      "navigate"; // Fallback for older browsers
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (navigationType === "reload" || !hasVisited) {
      sessionStorage.setItem("hasVisited", "true");
      setIsPreloaderVisible(true);

      const timer = setTimeout(() => {
        setIsPreloaderVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setIsPreloaderVisible(false);
    }
  }, []);

  return (
    <PreloaderContext.Provider value={{ isPreloaderVisible }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => useContext(PreloaderContext);

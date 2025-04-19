import React, { createContext, useContext, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export const PreloaderContext = createContext();

export const PreloaderProvider = ({ children }) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const isDevice = useMediaQuery({ maxWidth: 768 });

  const totalImages = 5; // Adjust as needed.

  useEffect(() => {
    if (typeof window !== "undefined") {
      const navigationEntry =
        performance.getEntriesByType("navigation")[0] || {};
      const navigationType = navigationEntry.type || "navigate";

      const hasVisited = sessionStorage.getItem("hasVisited") || "false";

      if (
        navigationType === "reload" ||
        navigationType === "navigate" ||
        hasVisited === "false"
      ) {
        sessionStorage.setItem("hasVisited", "true");
        setIsPreloaderVisible(true);
      } else {
        setIsPreloaderVisible(false);
      }
    }
  }, []);

  useEffect(() => {
    if (imagesLoaded >= totalImages) {
      const timer = setTimeout(() => setIsPreloaderVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsPreloaderVisible(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const onImageLoad = () =>
    setImagesLoaded((prev) => Math.min(prev + 1, totalImages));

  return (
    <PreloaderContext.Provider
      value={{
        isDevice,
        isPreloaderVisible,
        onImageLoad,
      }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => {
  const context = useContext(PreloaderContext);

  if (!context) {
    console.warn("usePreloader must be used within a PreloaderProvider");
    return {
      isDevice,
      isPreloaderVisible: false,
      onImageLoad: () => {},
    };
  }

  return context;
};

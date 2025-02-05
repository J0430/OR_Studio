"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const PreloaderContext = createContext();

export const PreloaderProvider = ({ children }) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 5; // ✅ Update this based on actual images

  useEffect(() => {
    const navigationEntry = performance.getEntriesByType("navigation")[0] || {};
    const navigationType = navigationEntry.type || "navigate";

    // ✅ Ensure `hasVisited` is properly assigned before checking
    const hasVisited = sessionStorage.getItem("hasVisited") || "false";

    if (navigationType === "reload" || hasVisited === "false") {
      sessionStorage.setItem("hasVisited", "true"); // ✅ Store visit status
      setIsPreloaderVisible(true);
    } else {
      setIsPreloaderVisible(false);
    }
  }, []);

  // ✅ Ensure preloader disappears even if images don't trigger `onImageLoad`
  useEffect(() => {
    if (imagesLoaded >= totalImages) {
      setTimeout(() => setIsPreloaderVisible(false), 1500);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsPreloaderVisible(false), 3500); // ✅ Auto-hide after 4s
    return () => clearTimeout(timeout);
  }, []);

  const onImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  return (
    <PreloaderContext.Provider value={{ isPreloaderVisible, onImageLoad }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => useContext(PreloaderContext);

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

    // Get whether the user has visited before
    const hasVisited = sessionStorage.getItem("hasVisited") || "false";

    // Handle preloader visibility based on navigation type and sessionStorage
    if (
      navigationType === "reload" ||
      navigationType === "navigate" ||
      hasVisited === "false"
    ) {
      sessionStorage.setItem("hasVisited", "true"); // ✅ Store visit status
      setIsPreloaderVisible(true);
    } else {
      setIsPreloaderVisible(false);
    }
  }, []);

  // Ensure preloader disappears after images are loaded
  useEffect(() => {
    if (imagesLoaded >= totalImages) {
      setTimeout(() => setIsPreloaderVisible(false), 4500); // Auto-hide after 4s
    }
  }, [imagesLoaded]);

  // Ensure preloader disappears after 4 seconds regardless
  useEffect(() => {
    const timeout = setTimeout(() => setIsPreloaderVisible(false), 4500);
    return () => clearTimeout(timeout); // Cleanup timeout
  }, []);

  // Increment the count of loaded images

  const onImageLoad = () => {
    setImagesLoaded((prev) => {
      if (prev < totalImages) {
        return prev + 1;
      }
      return prev; // Prevent exceeding totalImages
    });
  };

  return (
    <PreloaderContext.Provider value={{ isPreloaderVisible, onImageLoad }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => useContext(PreloaderContext);

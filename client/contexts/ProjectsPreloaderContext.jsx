"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ProjectsPreloaderContext = createContext();

export const ProjectsPreloaderProvider = ({ children }) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 50; // Adjust based on your project needs.

  // 🔹 Hide preloader once all images are loaded
  useEffect(() => {
    if (imagesLoaded >= totalImages) {
      setTimeout(() => setIsPreloaderVisible(false), 1000);
    }
  }, [imagesLoaded]);

  // 🔹 Ensure preloader disappears after 4 seconds (fallback)
  useEffect(() => {
    const timeout = setTimeout(() => setIsPreloaderVisible(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  // 🔹 Increment image load counter
  const onImageLoad = () => setImagesLoaded((prev) => prev + 1);

  return (
    <ProjectsPreloaderContext.Provider
      value={{ isPreloaderVisible, onImageLoad }}>
      {children}
    </ProjectsPreloaderContext.Provider>
  );
};

export const useProjectsPreloader = () => {
  if (typeof window === "undefined") {
    return {
      isPreloaderVisible: false,
      onImageLoad: () => {},
    };
  }

  const context = useContext(ProjectsPreloaderContext);

  if (!context) {
    console.warn(
      "useProjectsPreloader must be used within a ProjectsPreloaderProvider"
    );
    return {
      isPreloaderVisible: false,
      onImageLoad: () => {},
    };
  }

  return context;
};

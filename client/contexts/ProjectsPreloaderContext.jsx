"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ProjectsPreloaderContext = createContext();

export const ProjectsPreloaderProvider = ({ children }) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 50; // Adjust this based on your content.

  // Hide preloader when all images are loaded
  useEffect(() => {
    if (imagesLoaded >= totalImages) {
      setTimeout(() => setIsPreloaderVisible(false), 1000); // Smooth fade-out after 1s.
    }
  }, [imagesLoaded]);

  // Ensure preloader disappears after 4 seconds, regardless of loading state.
  useEffect(() => {
    const timeout = setTimeout(() => setIsPreloaderVisible(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  const onImageLoad = () => setImagesLoaded((prev) => prev + 1);

  return (
    <ProjectsPreloaderContext.Provider
      value={{ isPreloaderVisible, onImageLoad }}>
      {children}
    </ProjectsPreloaderContext.Provider>
  );
};

export const useProjectsPreloader = () => useContext(ProjectsPreloaderContext);

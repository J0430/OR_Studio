"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const ProjectsPreloaderContext = createContext();

export const ProjectsPreloaderProvider = ({ children }) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 5; // ✅ Update this number to match your project images

  useEffect(() => {
    if (imagesLoaded >= totalImages) {
      setTimeout(() => setIsPreloaderVisible(false), 1500); // ✅ Smooth fade-out
    }
  }, [imagesLoaded]);

  const onImageLoad = () => setImagesLoaded((prev) => prev + 1);

  return (
    <ProjectsPreloaderContext.Provider
      value={{ isPreloaderVisible, onImageLoad }}>
      {children}
    </ProjectsPreloaderContext.Provider>
  );
};

export const useProjectsPreloader = () => useContext(ProjectsPreloaderContext);

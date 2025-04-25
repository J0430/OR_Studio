import React, { createContext, useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";

const HomeContext = createContext();

export const HomeProvider = ({ children, data }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  const pathname = usePathname();

  useEffect(() => {
    const imageUrls = data?.projects
      ? Object.values(data.projects).flatMap((proj) => proj.images || [])
      : [];

    if (imageUrls.length === 0) {
      setIsPreloaderVisible(false);
      return;
    }

    setTotalImages(imageUrls.length);
    setImagesLoaded(0);

    imageUrls.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => setImagesLoaded((prev) => prev + 1);
      img.onerror = () => console.error("Error loading image:", src);
    });
  }, [data]);

  useEffect(() => {
    if (imagesLoaded >= totalImages && totalImages > 0) {
      setTimeout(() => setIsPreloaderVisible(false), 2000);
    }
  }, [imagesLoaded, totalImages]);

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  const toggleNav = () => setIsNavOpen((prev) => !prev);

  return (
    <HomeContext.Provider
      value={{
        isNavOpen,
        setIsNavOpen,
        toggleNav,
        isPreloaderVisible,
        setIsPreloaderVisible,
        imagesLoaded,
        totalImages,
        pathname,
        data, // ✅ Expose data here
      }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};

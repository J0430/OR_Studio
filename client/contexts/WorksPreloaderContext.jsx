import { createContext, useContext, useState, useEffect } from "react";

const WorksPreloaderContext = createContext();

export const WorksPreloaderProvider = ({ children }) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 10; // ✅ Adjust as needed for your works

  // ✅ Hide preloader once all images are loaded
  useEffect(() => {
    if (imagesLoaded >= totalImages) {
      setTimeout(() => setIsPreloaderVisible(false), 1000);
    }
  }, [imagesLoaded, totalImages]);

  // ✅ Fallback to hide preloader after 2.8 seconds
  useEffect(() => {
    const timeout = setTimeout(() => setIsPreloaderVisible(false), 2800);
    return () => clearTimeout(timeout);
  }, []);

  // ✅ Increment image load counter
  const onImageLoad = () => setImagesLoaded((prev) => prev + 1);

  return (
    <WorksPreloaderContext.Provider value={{ isPreloaderVisible, onImageLoad }}>
      {children}
    </WorksPreloaderContext.Provider>
  );
};

// ✅ Updated Hook with proper warnings and SSR-safe fallback
export const useWorksPreloader = () => {
  if (typeof window === "undefined") {
    return {
      isPreloaderVisible: false,
      onImageLoad: () => {},
    };
  }

  const context = useContext(WorksPreloaderContext);

  if (!context) {
    console.warn(
      "⚠️ useWorksPreloader must be used within a WorksPreloaderProvider"
    );
    return {
      isPreloaderVisible: false,
      onImageLoad: () => {},
    };
  }

  return context;
};

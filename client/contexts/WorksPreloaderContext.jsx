import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

// Create context
const WorksPreloaderContext = createContext(null);

// Provider
export const WorksPreloaderProvider = ({ children }) => {
  const router = useRouter();
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 10; // Adjust as needed

  // ✅ Show preloader only on first visit or reload for "/"
  useEffect(() => {
    if (typeof window !== "undefined" && router.pathname === "/") {
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
  }, [router.pathname]);

  // ✅ Always show preloader on /works until images load
  useEffect(() => {
    if (router.pathname === "/works" && imagesLoaded >= totalImages) {
      const timer = setTimeout(() => setIsPreloaderVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [router.pathname, imagesLoaded]);

  // ✅ Fallback timeout only for "/works"
  useEffect(() => {
    if (router.pathname === "/works") {
      const timeout = setTimeout(() => setIsPreloaderVisible(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [router.pathname]);

  const onImageLoad = () =>
    setImagesLoaded((prev) => Math.min(prev + 1, totalImages));

  return (
    <WorksPreloaderContext.Provider
      value={{
        isPreloaderVisible,
        onImageLoad,
      }}>
      {children}
    </WorksPreloaderContext.Provider>
  );
};

// Hook
export const useWorksPreloader = () => {
  const context = useContext(WorksPreloaderContext);

  if (!context) {
    console.warn(
      "⚠️ useWorksPreloader must be used within a WorksPreloaderProvider"
    );
    return { isPreloaderVisible: false, onImageLoad: () => {} };
  }

  return context;
};

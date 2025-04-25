import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

export const PreloaderContext = createContext();

export const usePreloader = () => {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};

export const PreloaderProvider = ({ children }) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const navigationEntry =
        performance.getEntriesByType("navigation")[0] || {};
      const navigationType = navigationEntry.type || "navigate";
      const hasVisited = sessionStorage.getItem("hasVisited");

      if (
        navigationType === "reload" ||
        navigationType === "navigate" ||
        !hasVisited
      ) {
        sessionStorage.setItem("hasVisited", "true");
        setIsPreloaderVisible(true);
      } else {
        setIsPreloaderVisible(false);
      }
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setIsPreloaderVisible(false), 2500);
  }, []);

  const contextValue = useMemo(
    () => ({
      isPreloaderVisible,
    }),
    [isPreloaderVisible]
  );

  return (
    <PreloaderContext.Provider value={contextValue}>
      {children}
    </PreloaderContext.Provider>
  );
};

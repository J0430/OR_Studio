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

export const PreloaderProvider = ({ children, data }) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [projectsData] = useState(data || {});

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
      img.onload = img.onerror = () => setImagesLoaded((prev) => prev + 1);
    });
  }, [data]);

  useEffect(() => {
    let timer;

    if (imagesLoaded >= totalImages && totalImages > 0) {
      timer = setTimeout(() => setIsPreloaderVisible(false), 3000);
    }

    return () => clearTimeout(timer);
  }, [imagesLoaded, totalImages]);

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

  const contextValue = useMemo(
    () => ({
      isPreloaderVisible,
      projectsData,
      imagesLoaded,
      totalImages,
      onImageLoad: () =>
        setImagesLoaded((prev) => Math.min(prev + 1, totalImages)),
    }),
    [isPreloaderVisible, projectsData, imagesLoaded, totalImages]
  );

  return (
    <PreloaderContext.Provider value={contextValue}>
      {children}
    </PreloaderContext.Provider>
  );
};

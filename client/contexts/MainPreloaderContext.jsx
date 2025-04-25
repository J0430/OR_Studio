import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";

const HomeContext = createContext();

export const HomeProvider = ({ children, data }) => {
  const pathname = usePathname();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  // Stable toggle function to avoid re-renders
  const toggleNav = useCallback(() => setIsNavOpen((prev) => !prev), []);

  // Preload images when `data` changes
  useEffect(() => {
    const imageUrls = data?.projects
      ? Object.values(data.projects).flatMap((proj) => proj.images || [])
      : [];

    if (!imageUrls.length) {
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

  // Handle preloader visibility
  useEffect(() => {
    let timeoutId;

    if (imagesLoaded >= totalImages && totalImages > 0) {
      timeoutId = setTimeout(() => setIsPreloaderVisible(false), 1500);
    }

    return () => clearTimeout(timeoutId);
  }, [imagesLoaded, totalImages]);

  // Close nav on route change
  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  // Memoize context value to reduce unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      isNavOpen,
      setIsNavOpen,
      toggleNav,
      isPreloaderVisible,
      setIsPreloaderVisible,
      imagesLoaded,
      totalImages,
      pathname,
      data,
    }),
    [
      isNavOpen,
      toggleNav,
      isPreloaderVisible,
      imagesLoaded,
      totalImages,
      pathname,
      data,
    ]
  );

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};

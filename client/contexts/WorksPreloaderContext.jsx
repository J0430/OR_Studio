import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useRouter } from "next/router";

// Create context
const WorksPreloaderContext = createContext(null);

// Provider
export const WorksPreloaderProvider = ({ children }) => {
  const router = useRouter();
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 10; // Adjust if needed

  const pathname = router.pathname;
  const isHomePath = pathname === "/";
  const isWorksPath = pathname === "/works";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const navEntries = performance.getEntriesByType("navigation");
    const navType = navEntries[0]?.type || "navigate";

    let timer;

    if (isWorksPath) {
      // Always show preloader on /works
      setIsPreloaderVisible(true);

      // Hide after all images load or fallback timer
      if (imagesLoaded >= totalImages) {
        timer = setTimeout(() => setIsPreloaderVisible(false), 2000);
      }

      // Fallback timeout in case images never fully load
      timer = setTimeout(() => setIsPreloaderVisible(false), 4000);
    } else if (isHomePath) {
      // Show preloader only on first visit or reload to "/"
      const hasShown = sessionStorage.getItem("preloaderShown");
      const hasUsedShallow = window.history.state?.shallow;
      const shouldShow =
        (navType === "navigate" || navType === "reload") &&
        !hasShown &&
        !hasUsedShallow;

      if (shouldShow) {
        sessionStorage.setItem("preloaderShown", "true");
        setIsPreloaderVisible(true);

        timer = setTimeout(() => setIsPreloaderVisible(false), 3000);
      }
    }

    return () => clearTimeout(timer);
  }, [pathname, imagesLoaded]);

  // Prevent body scroll while preloader is visible
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isPreloaderVisible ? "hidden" : "";
  }, [isPreloaderVisible]);

  const onImageLoad = () => {
    setImagesLoaded((prev) => Math.min(prev + 1, totalImages));
  };

  const contextValue = useMemo(
    () => ({
      isPreloaderVisible,
      onImageLoad,
    }),
    [isPreloaderVisible]
  );

  return (
    <WorksPreloaderContext.Provider value={contextValue}>
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

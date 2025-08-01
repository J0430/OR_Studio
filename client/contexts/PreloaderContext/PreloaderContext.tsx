// PreloaderContext.tsx:
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import type {
  PreloaderContextState,
  PreloaderContextProviderProps,
} from "./PreloaderContext.types";

const PreloaderContext = createContext<PreloaderContextState | undefined>(
  undefined
);

export const PreloaderContextProvider = ({
  children,
  preloader = null,
  timeoutDuration = 3000,
}: PreloaderContextProviderProps) => {
  const router = useRouter();
  const isDevice = useMediaQuery({ maxWidth: 768 });
  const isWorksPath = router.pathname === "/works";
  const isHomePath = router.pathname === "/";

  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);

  useEffect(() => {
    if (!preloader || typeof window === "undefined") return;

    const navEntries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    const navType = navEntries[0]?.type;

    let timer: NodeJS.Timeout;

    // Always show preloader on /works
    if (isWorksPath) {
      setIsPreloaderVisible(true);
      timer = setTimeout(() => {
        setIsPreloaderVisible(false);
      }, timeoutDuration);
    } else {
      // Only show once on / (first load or reload)
      const hasShown = sessionStorage.getItem("preloaderShown");
      const hasUsedShallow = window.history.state?.shallow;
      const shouldShow =
        isHomePath &&
        (navType === "navigate" || navType === "reload") &&
        !hasShown &&
        !hasUsedShallow;

      if (shouldShow) {
        sessionStorage.setItem("preloaderShown", "true");
        setIsPreloaderVisible(true);
        timer = setTimeout(() => {
          setIsPreloaderVisible(false);
        }, timeoutDuration);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [preloader, router.pathname, timeoutDuration, isWorksPath, isHomePath]);

  // Prevent body scroll while preloader is visible
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isPreloaderVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isPreloaderVisible]);

  const contextValue = useMemo(
    () => ({
      preloader,
      isPreloaderVisible,
      isDevice,
    }),
    [preloader, isPreloaderVisible, isDevice]
  );

  return (
    <PreloaderContext.Provider value={contextValue}>
      {/* Preloader Overlay */}
      {preloader && (
        <div
          style={{
            opacity: isPreloaderVisible ? 1 : 0,
            pointerEvents: isPreloaderVisible ? "auto" : "none",
            transition: "opacity 0.8s ease-in-out",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1000000,
          }}>
          {preloader}
        </div>
      )}

      {/* App Content (blurred when preloader visible) */}
      <div
        style={{
          filter: isPreloaderVisible ? "blur(10px)" : "none",
          transition: "filter 0.6s ease-in-out",
        }}>
        {children}
      </div>
    </PreloaderContext.Provider>
  );
};

export const usePreloaderContext = (): PreloaderContextState => {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error(
      "usePreloaderContext must be used within a PreloaderContextProvider"
    );
  }
  return context;
};

// contexts/PageContext.tsx
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
  PageContextState,
  PageContextProviderProps,
} from "./PageContext.types";

const PageContext = createContext<PageContextState | undefined>(undefined);

export const PageContextProvider = ({
  children,
  preloader = null,
  timeoutDuration = 1500,
}: PageContextProviderProps) => {
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

    // Always show on /works
    if (isWorksPath) {
      setIsPreloaderVisible(true);
      const timer = setTimeout(() => {
        setIsPreloaderVisible(false);
      }, timeoutDuration);
      return () => clearTimeout(timer);
    }

    // Only show once on / (first load or reload, not via shallow push)
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
      const timer = setTimeout(() => {
        setIsPreloaderVisible(false);
      }, timeoutDuration);
      return () => clearTimeout(timer);
    }
  }, [preloader, router.pathname, timeoutDuration, isWorksPath, isHomePath]);

  const contextValue = useMemo(
    () => ({
      preloader,
      isPreloaderVisible,
      isDevice,
    }),
    [preloader, isPreloaderVisible, isDevice]
  );

  return (
    <PageContext.Provider value={contextValue}>
      <div
        style={{
          position: "relative",
          zIndex: 0,
        }}>
        {/* Show preloader over content */}
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
        <div
          style={{
            filter: isPreloaderVisible ? "blur(10px)" : "none",
            transition: "filter 0.6s ease-in-out",
          }}>
          {children}
        </div>
      </div>
    </PageContext.Provider>
  );
};

export const usePageContext = (): PageContextState => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageContextProvider");
  }
  return context;
};

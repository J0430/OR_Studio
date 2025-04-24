import { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "@utils/api";
import {
  PageContextState,
  PageContextProviderProps,
} from "./PageContext.types";

const PageContext = createContext<PageContextState | undefined>(undefined);

export async function getStaticData(endpoints: string[]) {
  try {
    const responses = await Promise.all(
      endpoints.map((endpoint) => fetchData(endpoint))
    );

    const props = endpoints.reduce(
      (acc, key, index) => {
        acc[key] = responses[index];
        return acc;
      },
      {} as Record<string, any>
    );

    return { props };
  } catch (error) {
    console.error("Error in getStaticData:", error.message);

    const fallbackProps = endpoints.reduce(
      (acc, key) => {
        acc[key] = { projects: {}, frontImages: [], category: "" };
        return acc;
      },
      {} as Record<string, any>
    );

    return { props: fallbackProps };
  }
}

export const PageContextProvider = ({
  children,
  endpoints = [],
  timeoutDuration = 0,
  preloader,
  preloadImages = true,
}: PageContextProviderProps) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const [projectsData, setProjectsData] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.all(endpoints.map(fetchData));
        const dataMap = Object.fromEntries(
          endpoints.map((key, i) => [key, results[i]])
        );
        setProjectsData(dataMap);

        if (preloadImages) {
          const imageUrls = Object.values(dataMap)
            .flatMap((entry) =>
              Object.values(entry?.projects || {}).flatMap((project: any) => [
                project.frontImage,
                ...(project.images || []),
              ])
            )
            .filter(Boolean);

          setPreloadedImages(imageUrls);

          imageUrls.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => setImagesLoaded((n) => n + 1);
            img.onerror = () => console.error("❌ Failed to load image:", src);
          });
        }
      } catch (err) {
        console.error("❌ Error fetching data in PageContext:", err);
      }
    };

    if (endpoints.length > 0) fetchAll();
  }, [endpoints, preloadImages]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const navigationEntry = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      const navigationType = navigationEntry?.type || "navigate";

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
  }, []);
  useEffect(() => {
    if (preloadedImages.length > 0 && imagesLoaded >= preloadedImages.length) {
      const timer = setTimeout(
        () => setIsPreloaderVisible(false),
        timeoutDuration
      );
      return () => clearTimeout(timer);
    }

    const fallback = setTimeout(
      () => setIsPreloaderVisible(false),
      timeoutDuration
    );
    return () => clearTimeout(fallback);
  }, [imagesLoaded, preloadedImages.length, timeoutDuration]);

  return (
    <PageContext.Provider
      value={{
        endpoints,
        preloader,
        isPreloaderVisible,
        preloadedImages,
        imagesLoaded,
        projectsData,
        setImagesLoaded,
        setPreloadedImages,
        setProjectsData,
      }}>
      {isPreloaderVisible && preloader}
      {!isPreloaderVisible && children}
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

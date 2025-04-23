import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  ReactElement,
} from "react";
import { fetchData } from "@utils/api";

export interface ContextProps {
  isPreloaderVisible: boolean;
  preloadedImages: string[];
  imagesLoaded: number;
  projectsData: Record<string, any>;
  setImagesLoaded: (n: number) => void;
  setPreloadedImages: (images: string[]) => void;
  setProjectsData: (data: Record<string, any>) => void;
}

const Context = createContext<ContextProps | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
  endpoints?: string[]; // 👈 accepts ["home"], ["residential", "office"], etc.
  timeoutDuration?: number;
  preloader?: ReactElement;
  preloadImages?: boolean; // 👈 preload images if true
}

export const Provider = ({
  children,
  endpoints = [],
  timeoutDuration = 2800,
  preloader,
  preloadImages = true,
}: ProviderProps) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const [projectsData, setProjectsData] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.all(endpoints.map((ep) => fetchData(ep)));
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
        console.error("❌ Error in generic preloader fetch:", err);
      }
    };

    if (endpoints.length > 0) fetchAll();
  }, [endpoints]);

  useEffect(() => {
    if (imagesLoaded >= preloadedImages.length && preloadedImages.length > 0) {
      const timer = setTimeout(() => setIsPreloaderVisible(false), 1000);
      return () => clearTimeout(timer);
    }

    const fallback = setTimeout(
      () => setIsPreloaderVisible(false),
      timeoutDuration
    );
    return () => clearTimeout(fallback);
  }, [imagesLoaded, preloadedImages.length, timeoutDuration]);

  return (
    <Context.Provider
      value={{
        isPreloaderVisible,
        preloadedImages,
        imagesLoaded,
        projectsData,
        setImagesLoaded,
        setPreloadedImages,
        setProjectsData,
      }}>
      <>
        {isPreloaderVisible && preloader}
        {!isPreloaderVisible && children}
      </>
    </Context.Provider>
  );
};

export const usePreloader = (): ContextProps => {
  const context = useContext(Context);
  if (!context) {
    console.warn("⚠️ usePreloader must be used within a Provider");
    return {
      isPreloaderVisible: false,
      preloadedImages: [],
      imagesLoaded: 0,
      projectsData: {},
      setImagesLoaded: () => {},
      setPreloadedImages: () => {},
      setProjectsData: () => {},
    };
  }
  return context;
};

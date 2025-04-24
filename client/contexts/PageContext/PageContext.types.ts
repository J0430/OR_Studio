import { ReactNode, ReactElement } from "react";

export interface PageContextState {
  endpoints: string[];
  preloader: ReactElement;
  isPreloaderVisible: boolean;
  preloadedImages: string[];
  imagesLoaded: number;
  projectsData: Record<string, any>;
  setImagesLoaded: (n: number) => void;
  setPreloadedImages: (images: string[]) => void;
  setProjectsData: (data: Record<string, any>) => void;
}

export interface PageContextProviderProps {
  children: ReactNode;
  endpoints?: string[];
  timeoutDuration?: number;
  preloader?: ReactElement;
  preloadImages?: boolean;
}

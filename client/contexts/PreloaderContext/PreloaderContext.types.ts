import { ReactNode, ReactElement } from "react";

export interface PreloaderContextState {
  preloader: React.ReactNode;
  isPreloaderVisible: boolean;
  isDevice: boolean;
}

export interface PreloaderContextProviderProps {
  children: ReactNode;
  preloader?: ReactNode;
  timeoutDuration?: number;
}

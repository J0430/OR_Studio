import { ReactNode, ReactElement } from "react";

export interface PageContextState {
  preloader: React.ReactNode;
  isPreloaderVisible: boolean;
  isDevice: boolean;
}

export interface PageContextProviderProps {
  children: ReactNode;
  preloader?: ReactNode;
  timeoutDuration?: number;
}

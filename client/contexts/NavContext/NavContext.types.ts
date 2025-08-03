import { Dispatch, SetStateAction } from "react";

export interface NavContextState {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
  toggleNav: () => void;
  pathname: string;
}

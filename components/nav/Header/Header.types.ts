// components/common/Header/Header.types.ts

import type { FC } from "react";

export interface HeaderProps {
  HamburgerToggleButton: FC<{
    isOpen: boolean;
    onToggle: () => void;
    gapBetweenLines?: number;
    lineWidth?: number;
    "aria-expanded"?: boolean;
    "aria-controls"?: string;
  }>;
  AnimatedLogo: FC<{
    strokeColor?: string;
    size?: number;
    priority?: boolean;
  }>;
  NavbarLinks: FC<{
    setIsNavOpen: (val: boolean) => void;
    isNavOpen: boolean;
  }>;
}

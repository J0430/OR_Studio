export interface AnimatedLogoProps {
  logoName: string;
  size?: number;
  strokeColor?: string;
  fillColor?: string;
  animateFill?: boolean;
  strokeWidth?: number;
  className?: string;
  theme?: string;
  highRes?: boolean; // 🆕 Add this
}

export interface LogoPathsProps {
  outerPath: string;
  innerPaths: string[];
}

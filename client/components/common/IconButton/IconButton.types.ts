export interface IconButtonProps {
  direction?: "up" | "down" | "left" | "right";
  type?: "arrow" | "zoom-in" | "zoom-out";
  width?: number;
  height?: number;
  onClick?: () => void;
}

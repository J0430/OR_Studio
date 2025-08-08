export type IconButtonDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "zoomIn"
  | "zoomOut";

export interface IconButtonProps {
  direction?: IconButtonDirection;
  width?: number; // in rem units
  height?: number; // in rem units
  onClick?: () => void;
  className?: string;
}

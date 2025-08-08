import type { HTMLMotionProps } from "framer-motion";

export type ArrowDirection = "up" | "down" | "left" | "right";

export interface SendButtonProps
  extends Omit<HTMLMotionProps<"button">, "onClick"> {
  label?: string;
  direction?: ArrowDirection;
  sizeRem?: number;
  expandedWidthRem?: number;
  submit?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  forceExpanded?: boolean;
  className?: string;
  isSubmitting?: boolean;
}

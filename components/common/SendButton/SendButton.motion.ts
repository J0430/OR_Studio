// components/common/SendButton/SendButton.motion.ts
import { Variants } from "framer-motion";

export const containerVariants = (
  expandedWidthRem: number,
  sizeRem: number
): Variants => ({
  rest: {
    width: `${sizeRem}rem`,
    transition: { type: "spring", stiffness: 300, damping: 26 },
  },
  hover: {
    width: `${expandedWidthRem}rem`,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  focus: {
    width: `${expandedWidthRem}rem`,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
});

export const labelVariants: Variants = {
  rest: {
    opacity: 0,
    x: 6,
    clipPath: "inset(0 100% 0 0)",
    transition: { duration: 0.12 },
  },
  show: {
    opacity: 1,
    x: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.18 },
  },
};

export const iconVariants: Variants = {
  rest: { scale: 1, transition: { duration: 0.12 } },
  hover: { scale: 1.05, transition: { duration: 0.12 } },
  focus: { scale: 1.05, transition: { duration: 0.12 } },
};

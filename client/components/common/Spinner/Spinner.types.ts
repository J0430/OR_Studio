import type React from "react";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Outer diameter (rem). */
  sizeRem?: number;
  /** Border thickness (px). */
  thicknessPx?: number;
  /** Wrap spinner in a centered, subtle overlay. */
  overlay?: boolean;
  /** Accessible label for screen readers. */
  label?: string;
  /** Extra className for the core spinner element. */
  className?: string;
}

// ============================================================
// 📁 ScrollShadow.types.ts — Types for ScrollShadow Component
// ============================================================
import React from "react";

export interface ScrollShadowProps {
  /** Component children */
  children: React.ReactNode;

  /** Optional className for external styling */
  className?: string;

  style?: React.CSSProperties;
  color?: string;
}

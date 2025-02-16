"use client";

import { useState, useEffect } from "react";

export const usePreloader = (shouldShowPreloader, delay = 4000) => {
  const [showPreloader, setShowPreloader] = useState(shouldShowPreloader);

  useEffect(() => {
    if (shouldShowPreloader) {
      const timer = setTimeout(() => setShowPreloader(false), delay);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [shouldShowPreloader, delay]);

  return showPreloader;
};

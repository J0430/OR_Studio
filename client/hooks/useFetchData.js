"use client";

import React, { useState, useEffect } from "react";
import { fetchData } from "@utils/api";
import { usePreloader } from "@contexts/MainPreloaderContext";
import { preloadImages } from "@utils/imageUtils";

export const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { onImageLoad } = usePreloader();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchData(endpoint);

        if (!result || !result.projects) {
          throw new Error("No valid data received");
        }

        // **Extract and preload images from projects array**
        const allImages = result.projects.flatMap(
          (project) => project.images || []
        );
        preloadImages(allImages, onImageLoad);

        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [endpoint, onImageLoad]);

  return { data, loading, error };
};

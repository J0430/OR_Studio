"use client";

import React, { useState, useEffect } from "react";
import { fetchData } from "@utils/api";
import { usePreloader } from "@contexts/MainPreloaderContext"; // Use preloader context

export const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { onImageLoad } = usePreloader();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/data/${endpoint}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
        }

        const result = await res.json();

        // Preload images
        if (result && Array.isArray(result.HomePictures)) {
          result.HomePictures.forEach((image) => {
            const img = new Image();
            img.src = image;
            img.onload = () => onImageLoad();
          });
        }

        setData(result);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [endpoint, onImageLoad]);

  return { data, loading, error };
};

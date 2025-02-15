import { useState, useEffect } from "react";
import { fetchData } from "@utils/api";
import { usePreloader } from "@contexts/MainPreloaderContext"; // Use preloader context

export const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { onImageLoad } = usePreloader(); // Track image loading globally

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchData(endpoint);

        // Track all images in the data for the preloader
        if (result && Array.isArray(result.images)) {
          result.images.forEach((image) => {
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

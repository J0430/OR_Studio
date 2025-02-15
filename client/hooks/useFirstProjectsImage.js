import { useEffect, useState } from "react";
import { useFetchData } from "@hooks/useFetchData";

export const useFirstProjectImage = (endpoint) => {
  const { data, loading, error } = useFetchData(endpoint);
  const [firstImages, setFirstImages] = useState([]);

  useEffect(() => {
    if (data) {
      const images = data.projects.map((project) => ({
        id: project.id,
        title: project.title,
        frontImage: project.images[0],
        allImages: project.images,
        description: project.description,
      }));
      setFirstImages(images);
    }
  }, [data]);

  return { firstImages, loading, error };
};

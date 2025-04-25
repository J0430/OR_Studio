// contexts/WorksPreloaderContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "@utils/api";
const WorksPreloaderContext = createContext();

export const WorksPreloaderProvider = ({ children }) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState([]);
  const [projectsData, setProjectsData] = useState({});

  // Fetch the categories and images from your API and preload images
  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await Promise.all([
          fetchData("residential"),
          fetchData("commercial"), // ← NEW STRUCTURE
          fetchData("urbanPlanning"),
          fetchData("office"), // ← NEW STRUCTURE
        ]);

        const imageUrls = [
          ...Object.values(categories[0]?.projects || {}).flatMap((project) => [
            project.images[0],
            ...project.images,
          ]),
          ...Object.values(categories[1]?.projects || {}).flatMap((project) => [
            project.images[0],
            ...project.images,
          ]),
          ...Object.values(categories[2]?.projects || {}).flatMap((project) => [
            project.images[0],
            ...project.images,
          ]),
          ...Object.values(categories[3]?.projects || {}).flatMap((project) => [
            project.images[0],
            ...project.images,
          ]),
        ];

        // Set image URLs and projects data to state
        setPreloadedImages(imageUrls);
        setProjectsData({
          residential: categories[0] || { projects: {} },
          commercial: categories[1] || { projects: {} },
          urbanPlanning: categories[2] || { projects: {} },
          office: categories[3] || { projects: {} },
        });

        // Preload images
        imageUrls.forEach((imageSrc) => {
          const img = new Image();
          img.src = imageSrc;
          img.onload = () => setImagesLoaded((prev) => prev + 1);
        });
      } catch (error) {
        console.error("❌ Error in fetching data:", error);
      }
    }

    fetchCategories();
  }, []);

  // ✅ Hide preloader once all images are loaded
  useEffect(() => {
    if (imagesLoaded >= preloadedImages.length) {
      setTimeout(() => setIsPreloaderVisible(false), 1000);
    }
  }, [imagesLoaded, preloadedImages.length]);

  // ✅ Fallback to hide preloader after 2.8 seconds if images are slow to load
  useEffect(() => {
    const timeout = setTimeout(() => setIsPreloaderVisible(false), 2800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <WorksPreloaderContext.Provider
      value={{ isPreloaderVisible, preloadedImages, projectsData }}>
      {children}
    </WorksPreloaderContext.Provider>
  );
};

// Custom hook to access the preloader context
export const useWorksPreloader = () => {
  const context = useContext(WorksPreloaderContext);

  if (!context) {
    console.warn(
      "⚠️ useWorksPreloader must be used within a WorksPreloaderProvider"
    );
    return {
      isPreloaderVisible: false,
      preloadedImages: [],
      projectsData: {},
    };
  }

  return context;
};

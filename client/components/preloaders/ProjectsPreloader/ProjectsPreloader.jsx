"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./ProjectsPreloader.module.scss";
import { useProjectsPreloader } from "@contexts/ProjectsPreloaderContext";

const ProjectsPreloader = () => {
  const { isPreloaderVisible } = useProjectsPreloader();

  if (!isPreloaderVisible) return null;

  const totalDuration = 2.5;
  const strokeDuration = 1.5;
  const fillDelay = strokeDuration;

  // Paths for the animation with delay and fill properties
  const paths = [
    {
      d: "M 47.07 22.29 C 53.32 21.64 59.71 22.12 66.00 22.01 C 71.61 22.10 77.40 21.62 82.96 22.35 C 96.57 24.41 107.56 37.30 108.01 50.98 C 108.33 58.67 106.88 67.62 101.60 73.57 C 98.27 77.52 94.14 79.78 89.75 82.32 C 94.45 91.64 98.56 101.27 103.61 110.39 C 105.43 113.94 108.69 118.69 107.88 122.81 C 106.77 125.85 103.93 125.29 101.33 126.01 C 96.60 119.18 93.48 111.67 89.65 104.34 C 86.97 99.23 85.21 93.91 81.95 89.09 C 81.37 94.31 81.82 100.12 80.25 105.08 C 77.08 116.24 66.61 125.21 55.02 126.34 C 49.71 126.95 44.47 126.69 39.51 124.54 C 31.66 121.24 25.55 114.46 22.40 106.63 C 20.14 100.98 20.48 94.97 20.48 89.00 C 20.62 76.34 20.33 63.65 20.59 50.99 C 20.95 36.78 33.01 23.91 47.07 22.29 Z",
      stroke: "#a3b6bd",
      fill: "#a2b5bb",
      delay: 0, // No delay for stroke
    },
    {
      d: "M 74.20 32.06 C 79.10 31.89 83.99 31.98 88.22 34.77 C 92.35 37.47 96.15 41.57 97.65 46.35 C 99.38 52.73 98.94 59.58 95.15 65.16 C 92.02 70.26 87.16 72.23 81.88 74.42 C 81.60 64.71 83.02 53.77 80.60 44.36 C 79.44 39.58 76.59 36.20 74.20 32.06 Z",
      stroke: "#a3b6bd",
      fill: "black",
      delay: 0.2,
    },
    {
      d: "M 46.93 32.42 C 47.04 60.55 47.05 88.69 46.93 116.83 C 40.48 115.51 35.67 111.16 32.34 105.68 C 29.97 101.52 30.04 96.65 29.96 92.00 C 30.06 80.67 29.88 69.34 30.15 58.00 C 30.28 53.29 29.89 48.44 32.11 44.12 C 35.14 38.31 40.53 33.96 46.93 32.42 Z",
      stroke: "#a3b6bd",
      fill: "black",
      delay: 0.4,
    },
    {
      d: "M 56.57 32.51 C 57.47 32.94 58.36 33.37 59.26 33.81 C 66.18 36.99 71.40 43.18 71.86 50.97 C 72.18 58.75 72.24 66.56 72.25 74.35 C 67.07 74.53 61.89 74.55 56.70 74.49 C 56.30 60.51 56.52 46.50 56.57 32.51 Z",
      stroke: "#a3b6bd",
      fill: "black",
      delay: 0.6,
    },
    {
      d: "M 56.97 84.48 C 61.70 83.99 67.07 83.96 71.78 84.56 C 72.82 90.24 72.48 96.62 71.18 102.25 C 69.12 109.62 63.47 113.83 56.77 116.78 C 56.27 109.18 56.61 101.61 56.45 94.00 C 56.45 90.87 56.30 87.55 56.97 84.48 Z",
      stroke: "#a3b6bd",
      fill: "black",
      delay: 0.8,
    },
  ];

  return (
    <motion.div
      className={styles.preloaderContainer}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut", delay: totalDuration + 1 }}
      exit={{ opacity: 0 }}>
      <motion.svg
        className={styles.logo}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 125 150"
        width="125.0pt"
        height="150.0pt">
        {/* Stroke Animations */}
        {paths.map((path, index) => (
          <motion.path
            key={`stroke-${index}`}
            d={path.d}
            stroke={path.stroke}
            strokeWidth={2}
            fill="none"
            initial={{ strokeDasharray: 500, strokeDashoffset: 500 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: strokeDuration,
              ease: "easeInOut",
              delay: path.delay,
            }}
          />
        ))}

        {/* Fill Animations */}
        {paths.map((path, index) => (
          <motion.path
            key={`fill-${index}`}
            d={path.d}
            fill={path.fill}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: strokeDuration,
            }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
};

export default ProjectsPreloader;

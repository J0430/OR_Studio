"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../ProjectsGrid/ProjectsGrid.module.scss";

const ProjectGrid = ({ projects, onImageClick }) => {
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowImages(true);
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className={styles.projectsGridWrapper}
      aria-label="Project Grid"
      role="region">
      <div className={styles.gridContainer}>
        {projects.map((project, index) => (
          <div
            className={styles.gridItem}
            key={project.id}
            layoutid={project.frontImage}
            onClick={() => onImageClick(project.frontImage, project)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                onImageClick(project.frontImage, project);
            }}
            tabIndex={0}
            role="button"
            aria-label={`Open modal for ${project.title || `Project ${index + 1}`}`}>
            {showImages && (
              <Image
                src={project.frontImage}
                alt={project.title || `Project ${index + 1}`}
                width={500}
                height={500}
                className="loaded"
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectGrid;

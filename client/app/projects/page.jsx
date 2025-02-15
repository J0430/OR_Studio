"use client";

import React, { useState, useMemo } from "react";
import { useFirstProjectImage } from "@hooks/useFirstProjectsImage";
import { AnimatePresence } from "framer-motion";
import { useProjectsPreloader } from "@contexts/ProjectsPreloaderContext";
import { categories } from "@utils/globals";
import { fisherYatesShuffle, interleaveArrays } from "@utils/utils";
import dynamic from "next/dynamic";
import Head from "next/head";
import style from "@styles/pages/projects.module.scss";

const ProjectsModal = dynamic(
  () => import("@components/sections/projects/ProjectsModal/ProjectsModal"),
  { loading: () => <div>Loading Modal...</div> }
);
const ProjectsPreloader = dynamic(
  () => import("@components/preloaders/ProjectsPreloader/ProjectsPreloader"),
  { loading: () => <div>Loading Projects...</div> }
);
const ProjectsControl = dynamic(
  () => import("@components/sections/projects/ProjectsControl/ProjectsControl"),
  { loading: () => <div>Loading Categories...</div> }
);
const ProjectsGrid = dynamic(
  () => import("@components/sections/projects/ProjectsGrid/ProjectsGrid"),
  { loading: () => <div>Loading Projects...</div> }
);

function ProjectsPage() {
  const [categorySelected, setCategorySelected] = useState(categories[0]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const { firstImages: frontImagesResidential } = useFirstProjectImage(
    "residentialData.json"
  );
  const { firstImages: frontImagesUrbanPlanning } = useFirstProjectImage(
    "urbanPlanningData.json"
  );
  const { firstImages: frontImagesCommercial } = useFirstProjectImage(
    "commercialData.json"
  );

  const { isPreloaderVisible } = useProjectsPreloader();

  const projects = useMemo(() => {
    if (categorySelected === "Residential")
      return fisherYatesShuffle(frontImagesResidential);
    if (categorySelected === "Urban Planning")
      return fisherYatesShuffle(frontImagesUrbanPlanning);
    if (categorySelected === "Commercial")
      return fisherYatesShuffle(frontImagesCommercial);
    if (categorySelected === "All") {
      const allImages = interleaveArrays([
        frontImagesResidential,
        frontImagesUrbanPlanning,
        frontImagesCommercial,
      ]);
      return fisherYatesShuffle(allImages);
    }
    return [];
  }, [
    categorySelected,
    frontImagesResidential,
    frontImagesUrbanPlanning,
    frontImagesCommercial,
  ]);

  const handleCategoryClick = (categoryName) => {
    setCategorySelected(categoryName);
  };

  const handleImageClick = (image, project) => {
    setSelectedImage(image);
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setSelectedProject(null);
  };

  const isLoading = !frontImagesResidential || !frontImagesUrbanPlanning;

  return (
    <>
      <Head>
        <title>Projects | OR Studio</title>
        <meta
          name="description"
          content="Explore our featured projects in various categories including residential, urban planning, and more."
        />
      </Head>
      {isLoading || isPreloaderVisible ? (
        <ProjectsPreloader />
      ) : (
        <div className={style.projectsPage}>
          <ProjectsControl
            categories={categories}
            selectedCategory={categorySelected}
            onCategorySelect={handleCategoryClick}
          />
          <ProjectsGrid projects={projects} onImageClick={handleImageClick} />
          <AnimatePresence>
            {selectedImage && selectedProject && (
              <ProjectsModal
                selectedImage={selectedImage}
                project={selectedProject}
                onClose={handleCloseModal}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default ProjectsPage;

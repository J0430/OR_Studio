"use client";

import React from "react";
import styles from "../ProjectsControl/ProjectsControl.module.scss";

const ProjectsControl = ({
  categories = [],
  selectedCategory = "",
  onCategorySelect = () => {},
}) => {
  return (
    <div className={styles.projectsControl}>
      <div className={styles.projectsTitleBox}>
        <h1 className={styles.projectsTitle}>Work</h1>
      </div>

      <div className={styles.projectsTabsBox}>
        <div className={styles.projectsTabs}>
          {categories.map((category) => (
            <span
              key={category}
              className={`${styles.tab} ${
                selectedCategory === category ? styles.active : ""
              }`}
              onClick={() => onCategorySelect(category)}>
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.separator} />
    </div>
  );
};

export default ProjectsControl;

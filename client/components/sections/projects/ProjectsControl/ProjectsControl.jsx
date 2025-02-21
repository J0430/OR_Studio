import React from "react";
import { useMediaQuery } from "react-responsive";
import CategoryTab from "@components/common/CategoryTab/CategoryTab";
import styles from "../ProjectsControl/ProjectsControl.module.scss";

const Dropdown = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <select
      className={styles.projectsDropdown}
      value={selectedCategory}
      onChange={(e) => onCategorySelect(e.target.value)}>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

const ProjectsControl = ({
  categories = [],
  selectedCategory = "",
  onCategorySelect = () => {},
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <div className={styles.projectsControl}>
      <div className={styles.projectsTitleBox}>
        <h1 className={styles.projectsTitle}>Work</h1>
      </div>

      <div className={styles.projectsSelectorBox}>
        <nav className={styles.projectsSelector}>
          {isMobile ? (
            <Dropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={onCategorySelect}
            />
          ) : (
            categories.map((category) => (
              <CategoryTab
                key={category}
                category={category}
                selectedCategory={selectedCategory}
                onCategorySelect={onCategorySelect}
              />
            ))
          )}
        </nav>
      </div>

      <div className={styles.separator} />
    </div>
  );
};

export default ProjectsControl;

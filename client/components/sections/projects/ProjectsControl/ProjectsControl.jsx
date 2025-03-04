import { useMediaQuery } from "react-responsive";
import DropdownMenu from "@components/common/DropdownMenu/DropdownMenu";
import CategoryTab from "@components/common/CategoryTab/CategoryTab";
import styles from "../ProjectsControl/ProjectsControl.module.scss";

const ProjectsControl = ({
  categories = [],
  selectedCategory = "",
  onCategorySelect = () => {},
}) => {
  const isMobile = useMediaQuery({ maxWidth: 500 });

  return (
    <div
      className={
        isMobile ? styles.mobileProjectsControl : styles.projectsControl
      }>
      <div
        className={
          isMobile ? styles.mobileProjectsTitleBox : styles.projectsTitleBox
        }>
        <h1
          className={
            isMobile ? styles.mobileProjectTitle : styles.projectsTitle
          }>
          Works
        </h1>
      </div>

      <div
        className={
          isMobile
            ? styles.mobileProjectsSelectorWrapper
            : styles.projectsSelectorBox
        }>
        <nav
          className={
            isMobile ? styles.mobileProjectsSelector : styles.projectsSelector
          }>
          {isMobile ? (
            <DropdownMenu
              arrowDirection="up"
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
    </div>
  );
};

export default ProjectsControl;

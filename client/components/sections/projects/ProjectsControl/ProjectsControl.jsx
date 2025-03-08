import { useMediaQuery } from "react-responsive";
import { SlArrowDown } from "react-icons/sl";
import DropdownMenu from "@components/common/DropdownMenu/DropdownMenu";
import CategoryTab from "@components/common/CategoryTab/CategoryTab";
import styles from "../ProjectsControl/ProjectsControl.module.scss";

const ProjectsControl = ({
  categories = [],
  selectedCategory = "",
  onCategorySelect = () => {},
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div
      className={
        isMobile ? styles.mobileProjectsControl : styles.projectsControl
      }>
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
            <div className={styles.mobileProjectsTitleBox}>
              <div className={styles.mobileProjectTitle}>Works</div>
            </div>
          )}
          {!isMobile &&
            categories.map((category) => (
              <CategoryTab
                key={category}
                category={category}
                selectedCategory={selectedCategory}
                onCategorySelect={onCategorySelect}
              />
            ))}
        </nav>
      </div>
    </div>
  );
};

export default ProjectsControl;

import { useMediaQuery } from "react-responsive";
import { useNav } from "@contexts/NavContext";
import DropdownMenu from "@components/common/DropdownMenu/DropdownMenu";
import CategoryTab from "@components/common/CategoryTab/CategoryTab";
import styles from "../ProjectsControl/ProjectsControl.module.scss";

const ProjectsControl = ({
  categories = [],
  selectedCategory = "",
  onCategorySelect = () => {},
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { isNavOpen } = useNav();

  return (
    <section
      className={
        isMobile ? styles.mobileProjectsControl : styles.projectsControl
      }
      aria-label="Project Categories">
      {/* ✅ Hide dropdown when `NavLinks` is open */}
      {!isNavOpen && (
        <div
          className={
            isMobile
              ? styles.mobileProjectsSelectorWrapper
              : styles.projectsSelectorBox
          }>
          <nav
            className={
              isMobile ? styles.mobileProjectsSelector : styles.projectsSelector
            }
            aria-label="Category Navigation">
            {isMobile ? (
              <DropdownMenu
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={onCategorySelect}
              />
            ) : (
              <h2 className={styles.projectsTitle}>Works</h2>
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
      )}
    </section>
  );
};

export default ProjectsControl;

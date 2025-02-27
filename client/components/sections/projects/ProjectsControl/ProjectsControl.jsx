import { useMediaQuery } from "react-responsive";
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
    <div className={styles.projectsControl}>
      <div className={styles.projectsTitleBox}>
        <h1 className={styles.projectsTitle}>Works</h1>
      </div>

      <div className={styles.projectsSelectorBox}>
        <nav className={styles.projectsSelector}>
          {isMobile ? (
            <DropdownMenu
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

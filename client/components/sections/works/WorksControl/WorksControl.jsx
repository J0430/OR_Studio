import { useNav } from "@contexts/NavContext";
import DropdownMenu from "@components/common/DropdownMenu/DropdownMenu";
import CategoryTabs from "@components/common/CategoryTab/CategoryTabs";
import styles from "../WorksControl/WorksControl.module.scss";

const WorksControl = ({
  categories = [],
  selectedCategory = "",
  onCategorySelect = () => {},
}) => {
  const { isNavOpen } = useNav();
  const filteredCategories = categories.filter(
    (category) => category !== "Works"
  );

  return (
    <section className={styles.worksControl} aria-label="Work Categories">
      <div className={styles.worksTitleBox}>
        <h1 className={styles.worksTitle}>Works</h1>
      </div>

      <div className={styles.worksSelectorBox}>
        <nav className={styles.worksSelector} aria-label="Category Navigation">
          <CategoryTabs
            categories={filteredCategories}
            selectedCategory={selectedCategory}
            onCategorySelect={onCategorySelect}
          />
        </nav>
      </div>

      {/* Mobile Dropdown appears only on mobile via CSS */}
      <div className={styles.worksDropdownMobile}>
        <DropdownMenu
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={onCategorySelect}
        />
      </div>
    </section>
  );
};

export default WorksControl;

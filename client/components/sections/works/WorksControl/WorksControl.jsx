import dynamic from "next/dynamic";
import styles from "./WorksControl.module.scss"; // ✅ Assuming you store this SCSS

// ✅ Dynamic imports
const CategoryTabs = dynamic(
  () => import("@components/common/CategoryTab/CategoryTabs")
);
const DropdownMenu = dynamic(
  () => import("@components/common/DropdownMenu/DropdownMenu")
);

const WorksControl = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <section className={styles.worksControl} aria-label="Project Categories">
      {/* ✅ Desktop Tabs (Optional: Can be hidden on mobile via CSS) */}
      <div className={styles.tabsWrapper}>
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={onCategorySelect}
        />
      </div>

      {/* ✅ Always Visible Dropdown */}
      <div className={styles.dropdownWrapper}>
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

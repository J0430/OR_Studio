import { useEffect, useState } from "react";
import { useNav } from "@contexts/NavContext";
import { loadDynamicImports } from "@utils/loadDynamicImports";
import DropdownMenu from "@components/common/DropdownMenu/DropdownMenu";
import CategoryTabs from "@components/common/CategoryTabs/CategoryTabs";
import styles from "../WorksControl/WorksControl.module.scss";

// Dynamically import components
// const { DropdownMenu, CategoryTabs } = loadDynamicImports("common", [
//   "DropdownMenu",
//   "CategoryTabs",
// ]);

const WorksControl = ({
  categories = [],
  selectedCategory,
  onCategorySelect,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const filteredCategories = categories.filter((cat) => cat !== "Works");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollY > 100); // change 100px threshold if needed
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`${styles.worksControl} ${scrolled ? styles.blurred : ""}`}
      aria-label="Work Categories">
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

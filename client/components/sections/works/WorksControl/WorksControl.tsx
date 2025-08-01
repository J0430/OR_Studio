//WorksControl.tsx:

import { useEffect, useState } from "react";
import { loadDynamicImports } from "utils/loadDynamicImports";

import type { CategoryTabsProps } from "@common/CategoryTabs/CategoryTabs.types";
import type { DropdownMenuProps } from "@common/DropdownMenu/DropdownMenu.types";
import type { WorksControlProps } from "./WorksControl.types";

import styles from "./WorksControl.module.scss";

const { DropdownMenu, CategoryTabs } = loadDynamicImports("common", [
  "DropdownMenu",
  "CategoryTabs",
]) as {
  DropdownMenu: React.FC<DropdownMenuProps>;
  CategoryTabs: React.FC<CategoryTabsProps>;
};
const WorksControl: React.FC<WorksControlProps> = ({
  categories = [],
  selectedCategory,
  onCategorySelect,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollY > 100);
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
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={onCategorySelect}
          />
        </nav>
        <div className={styles.worksDropdownMobile}>
          <DropdownMenu
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={onCategorySelect}
          />
        </div>
      </div>
    </section>
  );
};

export default WorksControl;

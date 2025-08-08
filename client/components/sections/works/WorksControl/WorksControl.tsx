import { useEffect, useState } from "react";
import { loadDynamicImports } from "utils/loadDynamicImports";
import { useNav } from "@contexts/NavContext";

import type { WorksControlProps } from "./WorksControl.types";
import type { DropdownMenuProps } from "client/components/common/DropdownMenu/DropdownMenu.types";
import type { CategoryTabsProps } from "client/components/common/CategoryTabs/CategoryTabs.types";

import styles from "./WorksControl.module.scss";

// ✅ Dynamic imports (typed)
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
  const { isNavOpen } = useNav();

  return (
    <section
      className={styles.worksControl}
      data-open={isNavOpen}
      aria-label="Work Categories">
      {/* ✅ Desktop Tabs */}
      <div className={styles.worksTabs} aria-label="Category divigation">
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={onCategorySelect}
        />
      </div>

      {/* ✅ Mobile Dropdown */}
      <div className={styles.worksDropdown}>
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

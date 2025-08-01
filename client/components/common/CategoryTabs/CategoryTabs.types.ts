//CategoryTabs.type.ts:

export interface CategoryTabsProps {
  title?: string;
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

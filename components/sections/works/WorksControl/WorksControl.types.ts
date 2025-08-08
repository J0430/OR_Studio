// WorksControl.types.ts:

export interface WorksControlProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

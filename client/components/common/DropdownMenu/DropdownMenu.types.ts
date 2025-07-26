export interface DropdownMenuProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

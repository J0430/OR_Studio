import styles from "../CategoryTab/CategoryTab.module.scss";

const CategoryTab = ({ category, selectedCategory, onCategorySelect }) => {
  return (
    <button
      key={category}
      className={`${styles.categoryTab} ${
        selectedCategory === category ? styles.active : ""
      }`}
      onClick={() => onCategorySelect(category)}>
      {category}
    </button>
  );
};
export default CategoryTab;

import { useSelector } from "react-redux";
import categoryFilterStyles from "./CategoryFilter.module.css";

function CategoryFilter({ categories, handleCategoryChange }) {
  const currentCategory = useSelector((state) => state.filter.category);

  return (
    <>
      <label htmlFor="categories" className={categoryFilterStyles.label}>
        Category:
      </label>
      <select
        name="categories"
        id="categories"
        onChange={handleCategoryChange}
        value={currentCategory}
      >
        <option value="0">ALL</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default CategoryFilter;

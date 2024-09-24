import categoryFilterStyles from './CategoryFilter.module.css';

function CategoryFilter({ categories, handleCategoryChange }) {
  return (
    <>
      <label htmlFor="categories" className={categoryFilterStyles.label}>Category:</label>
      <select name="categories" id="categories" onChange={handleCategoryChange}>
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

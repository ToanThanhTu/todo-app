function CategoryFilter({ categories, handleCategoryChange }) {
  return (
    <div>
      <select name="categories" id="categories" onChange={handleCategoryChange}>
        <option value="0">ALL</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;

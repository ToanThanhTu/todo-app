import { Category } from "@/types"
import categoryFilterStyles from "./CategoryFilter.module.css"
import { useState } from "react"

function CategoryFilter({
  categories,
  setFilter,
}: {
  categories: Category[]
  setFilter: (value: string, filterType: "category" | "status") => void
}) {
  const [currentCategory, setCurrentCategory] = useState("")

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(event.target.value)
    setFilter(event.target.value, "category")
  }

  return (
    <>
      <label htmlFor="categories" className={categoryFilterStyles.label}>
        Category:
      </label>
      <select name="categories" id="categories" onChange={handleOnChange} value={currentCategory}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default CategoryFilter

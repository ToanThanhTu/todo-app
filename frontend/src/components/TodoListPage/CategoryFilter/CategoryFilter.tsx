import { Category } from "@/types"
import styles from "./CategoryFilter.module.css"
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
    <select name="categories" id="categories" onChange={handleOnChange} value={currentCategory} className={styles.dropdown}>
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  )
}

export default CategoryFilter

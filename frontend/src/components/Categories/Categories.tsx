import { useAppDispatch, useAppSelector } from "@/hooks"
import styles from "./Categories.module.css"
import { toast } from "sonner"
import { deleteTodo } from "@/reducers/todoListReducer"
import { deleteCategory } from "@/reducers/categoryReducer"

export default function Categories() {
  const dispatch = useAppDispatch()
  const categories = useAppSelector((state) => state.categories)
  const todoList = useAppSelector((state) => state.todoList)

  const handleDeleteCategory = (categoryId: string) => {
    const categoryToDelete = categories.find((category) => category.id === categoryId)

    if (!categoryToDelete) {
      toast.error("Category not found")
      return
    }

    const confirmed = window.confirm(
      `Deleting '${categoryToDelete.name}' category will also delete all of its related ToDo items. Do you want to proceed?`
    )

    if (confirmed) {
      const todosToDelete = todoList.filter((todo) => todo.category.id === categoryToDelete.id)

      todosToDelete.forEach((todoToDelete) => {
        dispatch(deleteTodo(todoToDelete.id))
      })

      dispatch(deleteCategory(categoryToDelete))
    }
  }

  return (
    <div>
      <h2>Categories</h2>

      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <span>{category.name}</span>
            <button className={styles.deleteBtn} onClick={() => handleDeleteCategory(category.id)}>
              Delete Category
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

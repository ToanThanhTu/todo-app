import { useAppDispatch, useAppSelector } from "@/hooks"
import styles from "./Categories.module.css"
import { toast } from "sonner"
import { deleteTodo } from "@/reducers/todoListReducer"
import { deleteCategory } from "@/reducers/categoryReducer"
import { Tile, TileContent, TileHeader } from "@/components/Tile/Tile"
import CategoryIcon from "@mui/icons-material/Category"
import NewCategoryButton from "@/components/Form/NewCategory"
import Progress from "@/components/Progress/Progress"

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
    <Tile style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TileHeader title="Categories" icon={<CategoryIcon />} style={{ fontSize: "1.2rem" }} />

      <NewCategoryButton categories={categories} />

      <ul className={styles.categoriesList}>
        {categories.map((category) => (
          <li key={category.id}>
            <Tile
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                border: "1px solid var(--border)",
              }}
            >
              <TileHeader
                title={category.name}
                children={
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete Category
                  </button>
                }
              />

              <div className="divider" />

              <TileContent>
                <ul>
                  <Progress
                    todoList={todoList.filter((todo) => todo.category.id === category.id)}
                  />
                </ul>
              </TileContent>
            </Tile>
          </li>
        ))}
      </ul>
    </Tile>
  )
}

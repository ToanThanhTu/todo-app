import CategoryFilter from "./CategoryFilter/CategoryFilter"
import StatusFilter from "./StatusFilter/StatusFilter"
import NewTodoButton from "../Form/NewTodo"
import { applyFilter } from "../../reducers/filterReducer"
import styles from "./TodoList.module.css"
import { Status, StatusFilterSelect, TodoItem } from "@/types"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useMemo } from "react"
import { Tile, TileContent, TileHeader } from "@/components/Tile/Tile"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import Todo from "@/components/TodoItem/TodoItem"
import NewCategoryButton from "@/components/Form/NewCategory"

function TodoList({ todoList }: { todoList: TodoItem[] }) {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((state) => state.filter)
  const categories = useAppSelector((state) => state.categories)

  const displayTodoList = useMemo(() => {
    // conditional todos display for either category or status or both
    return todoList.filter((item) => {
      // Skip items with invalid categories
      if (!item.category || !item.category.id) return false

      const categoryMatch = filter.category === "" || item.category.id === filter.category

      const statusMatch =
        filter.status === StatusFilterSelect.ALL ||
        item.status === (filter.status as unknown as Status)

      return categoryMatch && statusMatch
    })
  }, [todoList, filter])

  const setFilter = (value: string, filterType: keyof typeof filter) => {
    dispatch(
      applyFilter({
        ...filter,
        [filterType]: value,
      })
    )
  }

  return (
    <Tile style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TileHeader
        title="Todo List"
        icon={<FormatListBulletedIcon />}
        style={{ fontSize: "1.2rem" }}
      />

      <TileContent style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className={styles.addButtonsContainer}>
          <NewCategoryButton categories={categories} />
          <NewTodoButton />
        </div>

        <div>
          <div className={styles.filters}>
            <div className={styles.categoryFilterContainer}>
              <CategoryFilter categories={categories} setFilter={setFilter} />
            </div>

            <StatusFilter setFilter={setFilter} />
          </div>

          <div className={styles.list}>
            <ul className={styles.todoList}>
              {displayTodoList.map((item) => (
                <Todo key={item.id} todoItem={item} />
              ))}
            </ul>
          </div>
        </div>
      </TileContent>
    </Tile>
  )
}

export default TodoList

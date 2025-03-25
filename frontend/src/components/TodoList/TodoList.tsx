import CategoryFilter from "./CategoryFilter/CategoryFilter"
import StatusFilter from "./StatusFilter/StatusFilter"
import NewTodoButton from "../NewTodo/NewTodo"
import TodoListItem from "./TodoListItem"

import { applyFilter } from "../../reducers/filterReducer"
import { deleteTodo } from "../../reducers/todoListReducer"
import { deleteCategory } from "../../reducers/categoryReducer"

import todoListStyles from "./TodoList.module.css"
import { StatusFilterSelect, TodoItem } from "@/types"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { toast } from "sonner"
import { useMemo } from "react"

function TodoList({ todoList }: { todoList: TodoItem[] }) {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((state) => state.filter)
  const categories = useAppSelector((state) => state.categories)

  console.log("Filter: ", filter)
  console.log("todoList: ", todoList)

  const displayTodoList = useMemo(() => {
    // conditional todos display for when filter is ALL for either category or status or both
    return todoList.filter((item) => {
      // Skip items with invalid categories
      if (!item.category || !item.category.id) return false

      const categoryMatch = filter.category === "" || item.category.id === filter.category

      const statusMatch = filter.status === StatusFilterSelect.ALL || item.status === filter.status

      return categoryMatch && statusMatch
    })
  }, [todoList, filter])

  console.log("displayTodoList: ", displayTodoList)

  const setFilter = (value: string, filterType: keyof typeof filter) => {
    dispatch(
      applyFilter({
        ...filter,
        [filterType]: value,
      })
    )
  }

  const handleDeleteCategory = () => {
    const categoryToDelete = categories.find((category) => category.id === filter.category)

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

      dispatch(applyFilter({ category: "", status: StatusFilterSelect.ACTIVE }))
    }
  }

  return (
    <>
      <h2>ToDo List</h2>

      <div className={todoListStyles.filters}>
        <div>
          <CategoryFilter categories={categories} setFilter={setFilter} />
          {filter.category !== "" && (
            <button className={todoListStyles.deleteBtn} onClick={handleDeleteCategory}>
              Delete
            </button>
          )}
        </div>

        <StatusFilter setFilter={setFilter} />
      </div>

      <div className={todoListStyles.list}>
        {displayTodoList.map((item) => (
          <TodoListItem key={item.id} todoItem={item} />
        ))}
      </div>

      <NewTodoButton />
    </>
  )
}

export default TodoList

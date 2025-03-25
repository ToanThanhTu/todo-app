import { useAppSelector } from "@/hooks"
import { TodoItem } from "@/types"

interface Props {
  todoItem: TodoItem | null | undefined
}

export default function TodoItemPage({ todoItem }: Props) {
  const categories = useAppSelector((state) => state.categories)

  if (!todoItem) {
    return <div>Todo item not found.</div>
  }

  const category = categories.find((category) => category.id === todoItem.categoryId)

  return (
    <div>
      <h1>To Do Item</h1>
      <h2>{todoItem.content}</h2>
      <p>Category: {category ? category.name : "Category not found."}</p>
      <p>Status: {todoItem.status}</p>
    </div>
  )
}

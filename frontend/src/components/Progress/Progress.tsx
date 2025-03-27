import { Status, TodoItem } from "@/types"
import styles from "./Progress.module.css"
import CircularProgess from "@/components/Progress/CircularProgess"

export default function Progress({ todoList }: { todoList: TodoItem[] }) {
  const activeTodos = todoList.filter((todo) => todo.status === Status.ACTIVE)
  const completedTodos = todoList.filter((todo) => todo.status === Status.COMPLETED)
  const cancelledTodos = todoList.filter((todo) => todo.status === Status.CANCELLED)

  const activePercentage = (activeTodos.length / todoList.length) * 100
  const completedPercentage = (completedTodos.length / todoList.length) * 100
  const cancelledPercentage = (cancelledTodos.length / todoList.length) * 100

  return (
    <div className={styles.progressContainer}>
      <CircularProgess
        percentage={activePercentage}
        count={activeTodos.length}
        status={Status.ACTIVE}
      />

      <CircularProgess
        percentage={completedPercentage}
        count={completedTodos.length}
        status={Status.COMPLETED}
      />

      <CircularProgess
        percentage={cancelledPercentage}
        count={cancelledTodos.length}
        status={Status.CANCELLED}
      />
    </div>
  )
}

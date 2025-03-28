import { Status, User } from "@/types"
import styles from "./Dashboard.module.css"
import Intro from "@/components/Dashboard/Intro"
import ActiveTodos from "@/components/Dashboard/ActiveTodos"
import ProgressTile from "@/components/Dashboard/ProgressTile"
import CompletedTodos from "@/components/Dashboard/CompletedTodos"
import { useAppSelector } from "@/hooks"

export default function Dashboard({ user }: { user: User }) {
  const todoList = useAppSelector((state) => state.todoList)

  const isUserLoggedIn = user.id !== ""

  const activeTodos = todoList.filter((todo) => todo.status === Status.ACTIVE)
  const completedTodos = todoList.filter((todo) => todo.status === Status.COMPLETED)

  return (
    <div className={styles.dashboardContainer}>
      {isUserLoggedIn ? (
        <h1 className={styles.h1}>Welcome back, {user.username}!</h1>
      ) : (
        <h1 className={styles.h1}>Welcome to your simple ToDo App</h1>
      )}

      <section className={styles.dashboard}>
        <div className={styles.introAndTodoList}>
          <Intro />
          {isUserLoggedIn && <ActiveTodos activeTodos={activeTodos} />}
        </div>

        {isUserLoggedIn && (
          <div className={styles.progressAndCompleted}>
            <ProgressTile todoList={todoList} />

            <CompletedTodos completedTodos={completedTodos} />
          </div>
        )}
      </section>
    </div>
  )
}

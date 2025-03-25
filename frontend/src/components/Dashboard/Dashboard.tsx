import { Status, TodoItem, User } from "@/types"
import styles from "./Dashboard.module.css"
import TripOriginOutlinedIcon from "@mui/icons-material/TripOriginOutlined"
import CircleIcon from "@mui/icons-material/Circle"
import HomeIcon from "@mui/icons-material/Home"
import PendingActionsIcon from "@mui/icons-material/PendingActions"
import AssignmentIcon from "@mui/icons-material/Assignment"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"

interface Props {
  user: User
  todoList: TodoItem[]
}

export default function Dashboard({ user, todoList }: Props) {
  const isUserLoggedIn = user.id !== ""

  const activeTodos = todoList.filter((todo) => todo.status === Status.ACTIVE)
  const completedTodos = todoList.filter((todo) => todo.status === Status.COMPLETED)
  const cancelledTodos = todoList.filter((todo) => todo.status === Status.CANCELLED)

  return (
    <div>
      {isUserLoggedIn ? (
        <h1>Welcome back, {user.username}!</h1>
      ) : (
        <h1 className={styles.h1}>Welcome to your simple ToDo App</h1>
      )}

      <section className={styles.dashboard}>
        <div className={styles.introAndTodoList}>
          <article className={styles.intro}>
            <div className={styles.headerContainer}>
              <HomeIcon color="disabled" style={{ fontSize: "1.5rem" }} />
              <h2 className={styles.h2}>In this ToDo App, you can:</h2>
            </div>
            <ul className={styles.features}>
              {!isUserLoggedIn && <li>Create and login with a new user account.</li>}
              <li>Create and delete categories.</li>
              <li>Create ToDo items and update their status.</li>
              <li>Filter ToDo items based on categories and statuses.</li>
              <li>Check your progress on the dashboard.</li>
            </ul>
          </article>

          <article className={styles.activeTodoListContainer}>
            <div className={styles.headerContainer}>
              <PendingActionsIcon color="disabled" style={{ fontSize: "1.5rem" }} />
              <h2 className={styles.h2}>To-Do</h2>
            </div>

            {activeTodos.length > 0 ? (
              <ul className={styles.activeTodoList}>
                {activeTodos.map((todo) => (
                  <li key={todo.id} className={styles.todoItem}>
                    <div className={styles.todoItemDescription}>
                      <h3 className={styles.todoName}>{todo.content}</h3>
                      <p className={styles.categoryName}>{todo.category.name}</p>
                    </div>

                    <TripOriginOutlinedIcon color="primary" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noTodos}>All done! Great work!</p>
            )}
          </article>
        </div>

        <div className={styles.progressAndCompleted}>
          <article className={styles.progress}>
            <div className={styles.headerContainer}>
              <AssignmentIcon color="disabled" style={{ fontSize: "1.5rem" }} />
              <h2 className={styles.h2}>ToDo Status</h2>
            </div>
            <div className={styles.progressGrid}>
              <div>
                <p>{activeTodos.length}</p>

                <div className={styles.statusContainer}>
                  <CircleIcon color="primary" style={{ fontSize: "0.8rem" }} />
                  <h3 className={styles.status}>Active</h3>
                </div>
              </div>
              <div>
                <p>{completedTodos.length}</p>

                <div className={styles.statusContainer}>
                  <CircleIcon color="success" style={{ fontSize: "0.8rem" }} />
                  <h3 className={styles.status}>Completed</h3>
                </div>
              </div>
              <div>
                <p>{cancelledTodos.length}</p>

                <div className={styles.statusContainer}>
                  <CircleIcon color="error" style={{ fontSize: "0.8rem" }} />
                  <h3 className={styles.status}>Cancelled</h3>
                </div>
              </div>
            </div>
          </article>

          <article className={styles.completedItems}>
            <div className={styles.headerContainer}>
              <AssignmentTurnedInIcon color="disabled" style={{ fontSize: "1.5rem" }} />
              <h2 className={styles.h2}>Completed Items</h2>
            </div>
            <ul className={styles.completedTodoList}>
              {completedTodos.map((todo) => (
                <li key={todo.id} className={styles.todoItem}>
                  <div className={styles.todoItemDescription}>
                    <h3 className={styles.todoName}>{todo.content}</h3>
                    <p className={styles.categoryName}>{todo.category.name}</p>
                  </div>

                  <TripOriginOutlinedIcon color="success" />
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  )
}

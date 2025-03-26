import { Status, TodoItem, User } from "@/types"
import styles from "./Dashboard.module.css"
import TripOriginOutlinedIcon from "@mui/icons-material/TripOriginOutlined"
import CircleIcon from "@mui/icons-material/Circle"
import HomeIcon from "@mui/icons-material/Home"
import PendingActionsIcon from "@mui/icons-material/PendingActions"
import AssignmentIcon from "@mui/icons-material/Assignment"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"
import { Tile, TileContent, TileHeader } from "@/components/Tile/Tile"
import Todo from "@/components/TodoItem/TodoItem"

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
          <Tile>
            <TileHeader
              title="In this ToDo App, you can:"
              icon={<HomeIcon color="disabled" style={{ fontSize: "1.5rem" }} />}
            />

            <TileContent>
              <ul className={styles.features}>
                {!isUserLoggedIn && <li>Create and login with a new user account.</li>}
                <li>Create and delete categories.</li>
                <li>Create ToDo items and update their status.</li>
                <li>Filter ToDo items based on categories and statuses.</li>
                <li>Check your progress on the dashboard.</li>
              </ul>
            </TileContent>
          </Tile>

          <Tile>
            <TileHeader
              title="To-Do"
              icon={<PendingActionsIcon color="disabled" style={{ fontSize: "1.5rem" }} />}
            />

            <TileContent>
              {activeTodos.length > 0 ? (
                <ul className={styles.activeTodoList}>
                  {activeTodos.map((todo) => (
                    <Todo key={todo.id} todoItem={todo} />
                  ))}
                </ul>
              ) : (
                <p className={styles.noTodos}>All done! Great work!</p>
              )}
            </TileContent>
          </Tile>
        </div>

        <div className={styles.progressAndCompleted}>
          <Tile>
            <div className={styles.progressHeader}>
              <TileHeader
                title="ToDo Status"
                icon={<AssignmentIcon color="disabled" style={{ fontSize: "1.5rem" }} />}
              />
              <p className={styles.total}>Total: {todoList.length} items</p>
            </div>

            <TileContent>
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
            </TileContent>
          </Tile>

          <Tile>
            <TileHeader
              title="Completed Items"
              icon={<AssignmentTurnedInIcon color="disabled" style={{ fontSize: "1.5rem" }} />}
            />

            <TileContent>
              {completedTodos.length > 0 ? (
                <ul className={styles.completedTodoList}>
                  {completedTodos.map((todo) => (
                    <Todo key={todo.id} todoItem={todo} />
                  ))}
                </ul>
              ) : (
                <p className={styles.noTodos}>Nothing done yet!</p>
              )}
            </TileContent>
          </Tile>
        </div>
      </section>
    </div>
  )
}

import { Tile, TileContent, TileHeader } from "@/components/Tile/Tile"
import styles from "./Dashboard.module.css"
import Todo from "@/components/TodoItem/TodoItem"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"
import { TodoItem } from "@/types"

export default function CompletedTodos({ completedTodos }: { completedTodos: TodoItem[] }) {
  return (
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
  )
}

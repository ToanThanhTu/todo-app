import { Tile, TileContent, TileHeader } from "@/components/Tile/Tile"
import styles from "./Dashboard.module.css"
import Todo from "@/components/TodoItem/TodoItem"
import { TodoItem } from "@/types"
import PendingActionsIcon from "@mui/icons-material/PendingActions"

export default function ActiveTodos({ activeTodos }: { activeTodos: TodoItem[] }) {
  return (
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
          <p className={styles.noTodos}>Nothing to do for now...</p>
        )}
      </TileContent>
    </Tile>
  )
}

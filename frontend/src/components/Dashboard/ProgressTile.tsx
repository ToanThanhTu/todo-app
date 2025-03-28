import { Tile, TileContent, TileHeader } from "@/components/Tile/Tile"
import styles from "./Dashboard.module.css"
import Progress from "@/components/Progress/Progress"
import { TodoItem } from "@/types"
import AssignmentIcon from "@mui/icons-material/Assignment"

export default function ProgressTile({ todoList }: { todoList: TodoItem[] }) {
  return (
    <Tile>
      <div className={styles.progressHeader}>
        <TileHeader
          title="ToDo Status"
          icon={<AssignmentIcon color="disabled" style={{ fontSize: "1.5rem" }} />}
        />
        <p className={styles.total}>Total: {todoList.length} items</p>
      </div>

      <TileContent>
        <Progress todoList={todoList} />
      </TileContent>
    </Tile>
  )
}

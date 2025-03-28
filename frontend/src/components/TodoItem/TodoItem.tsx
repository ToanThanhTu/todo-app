import { Status, TodoItem } from "@/types"
import { PropsWithChildren, useState } from "react"
import styles from "./TodoItem.module.css"
import TripOriginOutlinedIcon from "@mui/icons-material/TripOriginOutlined"
import { useAppDispatch } from "@/hooks"
import { updateStatus } from "@/reducers/todoListReducer"
import StatusBar from "@/components/TodoItem/StatusBar/StatusBar"

interface Props {
  todoItem: TodoItem
}

export default function Todo({ todoItem }: PropsWithChildren<Props>) {
  const [isExpanded, setIsExpanded] = useState(false)
  const dispatch = useAppDispatch()

  const handleClick = (status: Status) => {
    dispatch(updateStatus(todoItem, status))
  }

  return (
    <li key={todoItem.id} className={styles.todoItem} onClick={() => setIsExpanded(!isExpanded)}>
      <div className={styles.todoItemDescription}>
        <div>
          <h3 className={styles.todoName}>{todoItem.content}</h3>
          <p className={styles.categoryName}>{todoItem.category.name}</p>
        </div>

        <TripOriginOutlinedIcon
          style={{
            color:
              todoItem.status === Status.ACTIVE
                ? "var(--status-active)"
                : todoItem.status === Status.COMPLETED
                ? "var(--status-completed)"
                : "var(--status-cancelled)",
          }}
        />
      </div>

      <div className={isExpanded ? styles.statusBarContainer : styles.statusBarContainerHidden}>
        <span className={styles.statusText}>Status:</span>
        <StatusBar currentStatus={todoItem.status} handleClick={handleClick} />
      </div>
    </li>
  )
}

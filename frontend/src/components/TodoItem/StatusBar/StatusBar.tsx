import { Status } from "@/types"
import styles from "@/components/TodoItem/StatusBar/StatusBar.module.css"

interface Props {
  currentStatus: Status
  handleClick: (status: Status) => void
}

export default function StatusBar({ currentStatus, handleClick }: Props) {
  return (
    <div className={styles.statusBar}>
      <button
        className={currentStatus === Status.ACTIVE ? styles.active : styles.inactive}
        onClick={() => handleClick(Status.ACTIVE)}
        style={currentStatus === Status.ACTIVE ? { color: "var(--status-active)" } : {}}
      >
        {Status.ACTIVE}
      </button>

      <button
        className={currentStatus === Status.COMPLETED ? styles.active : styles.inactive}
        onClick={() => handleClick(Status.COMPLETED)}
        style={currentStatus === Status.COMPLETED ? { color: "var(--status-completed)" } : {}}
      >
        {Status.COMPLETED}
      </button>

      <button
        className={currentStatus === Status.CANCELLED ? styles.active : styles.inactive}
        onClick={() => handleClick(Status.CANCELLED)}
        style={currentStatus === Status.CANCELLED ? { color: "var(--status-cancelled)" } : {}}
      >
        {Status.CANCELLED}
      </button>
    </div>
  )
}

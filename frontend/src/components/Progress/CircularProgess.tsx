import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import CircleIcon from "@mui/icons-material/Circle"
import styles from "./Progress.module.css"
import { Status } from "@/types"

interface Props {
  percentage: number
  count: number
  status: Status
}

export default function CircularProgess({ percentage, count, status }: Props) {
  let color = ""
  let dotColor = ""

  if (status === Status.ACTIVE) {
    color = "var(--status-active)"
    dotColor = "var(--status-active)"
  } else if (status === Status.COMPLETED) {
    color = "var(--status-completed)"
    dotColor = "var(--status-completed)"
  } else if (status === Status.CANCELLED) {
    color = "var(--status-cancelled)"
    dotColor = "var(--status-cancelled)"
  }

  if (count === 0) {
    color = "var(--gray)"
  }

  return (
    <div className={styles.progressCount}>
      <div className={styles.circleContainer}>
        <CircularProgressbar
          value={percentage}
          text={`${count}`}
          styles={buildStyles({
            strokeLinecap: "butt",
            pathColor: color,
            textColor: "var(--foreground)",
          })}
        />
      </div>

      <div className={styles.statusContainer}>
        <CircleIcon
          style={{
            fontSize: "0.8rem",
            color: dotColor,
          }}
        />
        <h3 className={styles.status}>{status}</h3>
      </div>
    </div>
  )
}

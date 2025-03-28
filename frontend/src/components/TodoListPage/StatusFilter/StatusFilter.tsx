import { StatusFilterSelect } from "@/types"
import styles from "./StatusFilter.module.css"
import { useAppSelector } from "@/hooks"

function StatusFilter({
  setFilter,
}: {
  setFilter: (value: string, filterType: "category" | "status") => void
}) {
  const currentStatus = useAppSelector((state) => state.filter.status)

  return (
    <>
      <div className={`${styles.buttonsContainer}`}>
        {Object.entries(StatusFilterSelect).map(([status, value]) => (
          <button
            key={status}
            onClick={(event) => setFilter(event.currentTarget.value, "status")}
            value={value}
            className={currentStatus === value ? styles.active : styles.inactive}
            style={
              currentStatus === value
                ? value === StatusFilterSelect.ACTIVE
                  ? { color: "var(--status-active)" }
                  : value === StatusFilterSelect.COMPLETED
                  ? { color: "var(--status-completed)" }
                  : value === StatusFilterSelect.CANCELLED
                  ? { color: "var(--status-cancelled)" }
                  : { color: "var(--primary)" }
                : {}
            }
          >
            {value === StatusFilterSelect.ALL ? "All" : value}
          </button>
        ))}
      </div>

      {/* Status Select for Smaller Screens */}
      <select
        name="status"
        id="status-dropdown"
        onChange={(event) => setFilter(event.target.value, "status")}
        value={currentStatus || StatusFilterSelect.ACTIVE}
        className={styles.dropdown}
      >
        {Object.entries(StatusFilterSelect).map(([status, value]) => (
          <option key={status} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  )
}

export default StatusFilter

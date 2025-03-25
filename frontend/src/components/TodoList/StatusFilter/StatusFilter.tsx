import { StatusFilterSelect } from "@/types"
import statusFilterStyles from "./StatusFilter.module.css"
import { useAppSelector } from "@/hooks"

function StatusFilter({
  setFilter,
}: {
  setFilter: (value: string, filterType: "category" | "status") => void
}) {
  const currentStatus = useAppSelector((state) => state.filter.status)

  return (
    <>
      <div className={`${statusFilterStyles.buttonsContainer}`}>
        {Object.entries(StatusFilterSelect).map(([status, value]) => (
          <button
            className={`${statusFilterStyles.button} ${
              value === currentStatus && statusFilterStyles.selected
            }`}
            key={status}
            onClick={(event) => setFilter(event.currentTarget.value, "status")}
            value={value}
          >
            {value}
          </button>
        ))}
      </div>

      <div className={statusFilterStyles.dropdown}>
        <label htmlFor="status-dropdown">Status:</label>
        <select
          name="status"
          id="status-dropdown"
          onChange={(event) => setFilter(event.target.value, "status")}
          value={currentStatus || StatusFilterSelect.ACTIVE}
        >
          <option value="ALL">ALL</option>
          {Object.entries(StatusFilterSelect).map(([status, value]) => (
            <option key={status} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default StatusFilter

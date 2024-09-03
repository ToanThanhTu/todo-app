import { useSelector } from "react-redux";
import { STATUS } from "../../../constants/statusConstants";
import statusFilterStyles from "./StatusFilter.module.css";

function StatusFilter({ handleStatusChange }) {
  const currentStatus = useSelector((state) => state.filter.status);

  return (
    <>
      <div className={`${statusFilterStyles.buttonsContainer}`}>
        <button
          className={`${statusFilterStyles.button} ${
            currentStatus === "ALL" && statusFilterStyles.selected
          }`}
          onClick={handleStatusChange}
          value="ALL"
        >
          ALL
        </button>
        {Object.entries(STATUS).map(([status, value]) => (
          <button
            className={`${statusFilterStyles.button} ${
              value === currentStatus && statusFilterStyles.selected
            }`}
            key={status}
            onClick={handleStatusChange}
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
          onChange={handleStatusChange}
          defaultValue={STATUS.ACTIVE}
        >
          <option value="ALL">ALL</option>
          {Object.entries(STATUS).map(([status, value]) => (
            <option key={status} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default StatusFilter;

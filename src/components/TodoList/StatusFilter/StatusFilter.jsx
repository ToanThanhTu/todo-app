import { STATUS } from "../../../constants/statusConstants";

function StatusFilter({ handleStatusChange }) {
  return (
    <div>
      <button onClick={handleStatusChange} value="ALL">
          ALL
        </button>
      {Object.entries(STATUS).map(([key, value]) => (
        <button key={key} onClick={handleStatusChange} value={value}>
          {value}
        </button>
      ))}
    </div>
  );
}

export default StatusFilter;

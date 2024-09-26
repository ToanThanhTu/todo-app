import { Link } from "react-router-dom";
import { STATUS } from "../../constants/statusConstants";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../reducers/todoListReducer";

import todoListStyles from "./TodoList.module.css";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

function TodoListItem({ item }) {
  const dispatch = useDispatch();

  const setStatus = (status) => {
    dispatch(updateStatus(item, status));
  };

  return (
    <div className={todoListStyles.item}>
      <Link to={`/todos/${item.id}`}>
        {item.content}{" "}
        {item.status === STATUS.CANCELLED && (
          <span>
            <i> - Cancelled</i>
          </span>
        )}
      </Link>

      <div className={todoListStyles.buttonsContainer}>
        {/* Buttons to change status */}
        {item.status !== STATUS.ACTIVE && item.status !== STATUS.CANCELLED ? (
          <CheckCircleIcon
            className={todoListStyles.button}
            onClick={() => setStatus(STATUS.ACTIVE)}
            sx={{ color: "var(--primary-color-dark)" }}
          />
        ) : null}

        {item.status !== STATUS.COMPLETED &&
        item.status !== STATUS.CANCELLED ? (
          <CheckCircleOutlineIcon
            className={todoListStyles.button}
            onClick={() => setStatus(STATUS.COMPLETED)}
          />
        ) : null}

        {item.status === STATUS.ACTIVE && (
          <ClearOutlinedIcon
            className={todoListStyles.button}
            onClick={() => setStatus(STATUS.CANCELLED)}
          />
        )}

        {item.status === STATUS.CANCELLED && (
          <button
            className={todoListStyles.makeActiveBtn}
            onClick={() => setStatus(STATUS.ACTIVE)}
          >
            Make active
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoListItem;

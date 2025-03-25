import { Link } from "react-router-dom";

import { updateStatus } from "../../reducers/todoListReducer";

import todoListStyles from "./TodoList.module.css";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useAppDispatch } from "@/hooks";
import { Status, TodoItem } from "@/types";

function TodoListItem({ todoItem }: { todoItem: TodoItem }) {
  const dispatch = useAppDispatch();

  const setStatus = (status: Status) => {
    dispatch(updateStatus(todoItem, status));
  };

  return (
    <div className={todoListStyles.item}>
      <Link to={`/todos/${todoItem.id}`}>
        {todoItem.content}{" "}
        {todoItem.status === Status.CANCELLED && (
          <span>
            <i> - Cancelled</i>
          </span>
        )}
      </Link>

      {/* Buttons to change status, with conditional visibility */}
      <div className={todoListStyles.buttonsContainer}>
        {todoItem.status !== Status.ACTIVE && todoItem.status !== Status.CANCELLED ? (
          <CheckCircleIcon
            className={todoListStyles.button}
            onClick={() => setStatus(Status.ACTIVE)}
            sx={{ color: "var(--primary-color-dark)" }}
          />
        ) : null}

        {todoItem.status !== Status.COMPLETED &&
        todoItem.status !== Status.CANCELLED ? (
          <CheckCircleOutlineIcon
            className={todoListStyles.button}
            onClick={() => setStatus(Status.COMPLETED)}
          />
        ) : null}

        {todoItem.status === Status.ACTIVE && (
          <ClearOutlinedIcon
            className={todoListStyles.button}
            onClick={() => setStatus(Status.CANCELLED)}
          />
        )}

        {todoItem.status === Status.CANCELLED && (
          <button
            className={todoListStyles.makeActiveBtn}
            onClick={() => setStatus(Status.ACTIVE)}
          >
            Make active
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoListItem;

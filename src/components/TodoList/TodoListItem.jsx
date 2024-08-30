import { Link } from "react-router-dom";
import { STATUS } from "../../constants/statusConstants";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../reducers/todoListReducer";

function TodoListItem({ item }) {
  const dispatch = useDispatch();

  const setStatus = (event) => {
    const status = event.target.value;

    dispatch(updateStatus(item, status));
  };

  return (
    <li>
      <Link to={`/todos/${item.id}`}>{item.content}</Link>
      {item.status !== STATUS.ACTIVE && (
        <button onClick={setStatus} value={STATUS.ACTIVE}>
          Make active
        </button>
      )}
      {item.status !== STATUS.COMPLETED && (
        <button onClick={setStatus} value={STATUS.COMPLETED}>
          Complete
        </button>
      )}
      {item.status === STATUS.ACTIVE && (
        <button onClick={setStatus} value={STATUS.CANCELLED}>
          Cancel
        </button>
      )}
    </li>
  );
}

export default TodoListItem;

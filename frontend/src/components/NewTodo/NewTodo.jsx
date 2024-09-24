import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import newTodoStyles from "./NewTodo.module.css";

import { addTodoItem } from "../../reducers/todoListReducer";
import { STATUS } from "../../constants/statusConstants";
import ToggleableModal from "../Modal/ToggleableModal";
import { useRef } from "react";

function NewTodoButton() {
  const todoFormRef = useRef();

  const handleClose = () => {
    todoFormRef.current.toggleShowModal();
  };

  return (
    <ToggleableModal
      buttonName="New ToDo Item"
      styles={newTodoStyles.button}
      ref={todoFormRef}
    >
      <NewTodoForm onClose={handleClose} />
    </ToggleableModal>
  );
}

function NewTodoForm({ onClose }) {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);

  const handleSubmit = (event) => {
    event.preventDefault();

    const taskContent = event.target.taskContent.value;
    const taskCategory = event.target.taskCategory.value;
    const taskStatus = event.target.taskStatus.value;

    dispatch(addTodoItem(taskContent, taskCategory, taskStatus));

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={newTodoStyles.modal}>
      <h1>New ToDo Task</h1>

      <div>
        <label htmlFor="task-content">Task content:</label>
        <input id="task-content" type="text" name="taskContent" />
      </div>

      <div>
        <label htmlFor="taskCategory">Task category:</label>
        <select name="taskCategory" id="taskCategory">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="taskStatusSelect">Task status:</label>
        <select name="taskStatus" id="taskStatusSelect">
          <option value={STATUS.ACTIVE}>{STATUS.ACTIVE}</option>
          <option value={STATUS.COMPLETED}>{STATUS.COMPLETED}</option>
        </select>
      </div>

      <div className="buttonsContainer">
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </form>
  );
}

export default NewTodoButton;

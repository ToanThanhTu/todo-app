import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addTodoItem } from "../../reducers/todoListReducer";
import { displayNotification } from "../../reducers/notificationReducer";

import newTodoStyles from "./NewTodo.module.css";

import { STATUS } from "../../constants/statusConstants";

import ToggleableModal from "../Modal/ToggleableModal";
import Notification from "../Notification/Notification";

function NewTodoButton() {
  const todoFormRef = useRef();

  const handleClose = () => {
    todoFormRef.current.toggleShowModal();
  };

  return (
    <ToggleableModal buttonName="New ToDo Item" ref={todoFormRef}>
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

    if (!taskContent) {
      dispatch(
        displayNotification({
          message: "Please enter ToDo task content",
          type: "error",
        })
      );
      return;
    }

    dispatch(addTodoItem(taskContent, taskCategory, taskStatus));

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="modal">
      <h1>New ToDo Task</h1>

      <Notification />

      <div className={newTodoStyles.inputs}>
        <label htmlFor="task-content">Task content:</label>
        <input id="task-content" type="text" name="taskContent" />
      </div>

      <div className={newTodoStyles.inputs}>
        <label htmlFor="taskCategory">Task category:</label>
        <select name="taskCategory" id="taskCategory">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className={newTodoStyles.inputs}>
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

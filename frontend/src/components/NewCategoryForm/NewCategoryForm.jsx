import { useDispatch } from "react-redux";

import { addCategory } from "../../reducers/categoryReducer";
import { displayNotification } from "../../reducers/notificationReducer";

import categoryFormStyles from "./NewCategoryForm.module.css";

import Notification from "../Notification/Notification";

function NewCategoryForm({ onClose }) {
  const dispatch = useDispatch();

  const createCategory = (event) => {
    event.preventDefault();

    const name = event.target.categoryName.value;

    if (!name) {
      dispatch(
        displayNotification({
          message: "Please enter a category name",
          type: "error",
        })
      );
      return;
    }

    dispatch(addCategory(name));

    onClose();
  };

  return (
    <form onSubmit={createCategory} className="modal">
      <h1>New Category</h1>

      <Notification />

      <div className={categoryFormStyles.categoryInput}>
        <label htmlFor="category-name">Category name:</label>
        <input id="category-name" type="text" name="categoryName" />
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

export default NewCategoryForm;

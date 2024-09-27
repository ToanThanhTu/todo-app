import { useDispatch } from "react-redux";

import { addCategory } from "../../reducers/categoryReducer";

import categoryFormStyles from "./NewCategoryForm.module.css";

function NewCategoryForm({ onClose }) {
  const dispatch = useDispatch();

  const createCategory = (event) => {
    event.preventDefault();

    const name = event.target.categoryName.value;

    dispatch(addCategory(name));

    onClose();
  };

  return (
    <form onSubmit={createCategory} className="modal">
      <h1>New Category</h1>

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

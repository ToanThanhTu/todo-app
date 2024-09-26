import { useDispatch } from "react-redux";
import categoryFormStyles from "./NewCategoryForm.module.css";
import { addCategory } from "../../reducers/categoryReducer";

function NewCategoryForm({ onClose }) {
  const dispatch = useDispatch();

  const createCategory = (event) => {
    event.preventDefault();

    const name = event.target.categoryName.value;

    dispatch(addCategory(name));

    onClose();
  };

  return (
    <form onSubmit={createCategory} className={categoryFormStyles.modal}>
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

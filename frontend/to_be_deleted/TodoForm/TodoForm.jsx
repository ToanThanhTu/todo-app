import { useDispatch } from "react-redux";
import { addTodoItem } from "../../src/reducers/todoListReducer";

function TodoForm() {
  const dispatch = useDispatch();

  const addItem = (event) => {
    event.preventDefault();

    const content = event.target.content.value;
    dispatch(addTodoItem(content));
  };

  return (
    <form onSubmit={addItem}>
      <label htmlFor="input">Add a ToDo item</label>
      <input id="input" type="text" name="content" />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;

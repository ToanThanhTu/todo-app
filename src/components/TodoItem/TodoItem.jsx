import { useSelector } from "react-redux";

function TodoItem({ todoItem }) {
  const categories = useSelector(state => state.categories);

  const category = categories.find((category) => category.id === todoItem.category);

  return (
    <div>
      <h1>To Do Item</h1>
      <h2>{todoItem.content}</h2>
      <p>Category: {category.name}</p>
      <p>Status: {todoItem.status}</p>
    </div>
  );
}

export default TodoItem;

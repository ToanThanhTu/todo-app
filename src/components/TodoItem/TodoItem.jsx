function TodoItem({ todoItem }) {
  return (
    <div>
      <h1>To Do Item</h1>
      <h2>{todoItem.content}</h2>
      <p>Category: {todoItem.category}</p>
    </div>
  );
}

export default TodoItem;

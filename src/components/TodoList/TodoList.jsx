import TodoItem from "./TodoItem";

function TodoList({ todoList }) {
  return (
    <>
      <h2>ToDo List</h2>
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>
            <TodoItem todoItem={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;

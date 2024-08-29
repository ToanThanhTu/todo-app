import TodoItem from "./TodoItem";

import todoListStyles from "./TodoList.module.css";

function TodoList({ todoList }) {
  return (
    <>
      <h2>ToDo List</h2>

      <div className={todoListStyles.filters}>

      </div>

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

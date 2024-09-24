import todoListStyles from "./TodoList.module.css";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import CategoryFilter from "./CategoryFilter/CategoryFilter";
import StatusFilter from "./StatusFilter/StatusFilter";

import { applyFilter } from "../../reducers/filterReducer";

import NewTodoButton from "../NewTodo/NewTodo";
import TodoListItem from "./TodoListItem";
import { deleteTodo } from "../../reducers/todoListReducer";
import { deleteCategory } from "../../reducers/categoryReducer";
import { STATUS } from "../../constants/statusConstants";

function TodoList({ todoList }) {
  const filter = useSelector((state) => state.filter);
  const categories = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  const setFilter = (event, filterType) => {
    const value = event.target.value;

    dispatch(
      applyFilter({
        ...filter,
        [filterType]: value,
      })
    );
  };

  let displayTodoList = [];

  // conditional todos display for when filter is ALL for either category or status or both
  if (filter.category === "0" && filter.status === "ALL") {
    displayTodoList = todoList;
  } else if (filter.status === "ALL") {
    displayTodoList = todoList.filter(
      (item) => item.category.id === filter.category
    );
  } else if (filter.category === "0") {
    displayTodoList = todoList.filter((item) => item.status === filter.status);
  } else {
    // Apply filter as normal
    displayTodoList = todoList.filter((item) => {
      return item.category.id === filter.category && item.status === filter.status;
    });
  }

  const handleDeleteCategory = () => {
    const categoryToDelete = categories.find(
      (category) => category.id === filter.category
    );

    const confirmed = window.confirm(
      `Are you sure you want to delete '${categoryToDelete.name}' and all of its items?`
    );

    if (confirmed) {
      const todosToDelete = todoList.filter(
        (todo) => todo.category.id === categoryToDelete.id
      );

      dispatch(deleteCategory(categoryToDelete));

      todosToDelete.forEach((todoToDelete) => {
        dispatch(deleteTodo(todoToDelete.id));
      });

      dispatch(applyFilter({ category: "0", status: STATUS.ACTIVE }));
    }
  };

  return (
    <>
      <h2>ToDo List</h2>

      <div className={todoListStyles.filters}>
        <div>
          <CategoryFilter
            categories={categories}
            handleCategoryChange={(event) => setFilter(event, "category")}
          />
          {filter.category !== "0" && (
            <button
              className={todoListStyles.deleteBtn}
              onClick={handleDeleteCategory}
            >
              Delete
            </button>
          )}
        </div>

        <StatusFilter
          handleStatusChange={(event) => setFilter(event, "status")}
        />
      </div>

      <div className={todoListStyles.list}>
        {displayTodoList.map((item) => (
          <TodoListItem key={item.id} item={item} />
        ))}
      </div>

      <NewTodoButton />
    </>
  );
}

export default TodoList;

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

// reducers
import { initializeTodoList } from "./reducers/todoListReducer";

// components
import TodoList from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoItem from "./components/TodoList/TodoItem";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeTodoList());
  }, [dispatch]);

  const todoList = useSelector((state) => state.todoList);

  return (
    <main className="app">
      <NavBar />

      <div className="container">
        <SideBar />

        <div className="content">
          <h1>ToDo App</h1>

          <TodoForm />

          <Routes>
            <Route path="/todo/:id" element={<TodoItem />} />
            <Route path="/todo" element={<TodoList todoList={todoList} />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;

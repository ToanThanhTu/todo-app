import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

// reducers
import { initializeTodoList } from "./reducers/todoListReducer";
import { initializeCategories } from "./reducers/categoryReducer";

// components
import TodoList from "./components/TodoList/TodoList";
import TodoItem from "./components/TodoList/TodoItem";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeTodoList());
    dispatch(initializeCategories());
  }, [dispatch]);

  const todoList = useSelector((state) => state.todoList);
  const categories = useSelector((state) => state.categories);  

  return (
    <main className="app">
      <NavBar />

      <div className="container">
        <SideBar categories={categories} />

        <div className="content">
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

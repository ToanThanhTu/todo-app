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
import TodoItem from "./components/TodoItem/TodoItem";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import { useMatch } from "react-router-dom";
import Contacts from "./components/Contacts/Contacts";
import Login from "./components/Login/Login";

function App() {
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeTodoList());
    dispatch(initializeCategories());
  }, [dispatch]);

  const todoList = useSelector((state) => state.todoList);
  const categories = useSelector((state) => state.categories);

  const match = useMatch("/todos/:id");
  const todoItem = match
    ? todoList.find((item) => item.id === match.params.id)
    : null;

  return (
    <main className="app">
      <NavBar />

      <div className="container">
        <SideBar categories={categories} todoList={todoList} />

        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route
              path="/todos/:id"
              element={<TodoItem todoItem={todoItem} />}
            />
            <Route path="/todos" element={<TodoList todoList={todoList} />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;

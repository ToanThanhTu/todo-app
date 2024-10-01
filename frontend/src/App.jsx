import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useMatch } from "react-router-dom";

// reducers
import { initializeTodoList } from "./reducers/todoListReducer";
import { initializeCategories } from "./reducers/categoryReducer";
import { initializeUser } from "./reducers/userReducer";

// components
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import TodoList from "./components/TodoList/TodoList";
import TodoItem from "./components/TodoItem/TodoItem";
import Contacts from "./components/Contacts/Contacts";
import Login from "./components/Login/Login";

function App() {
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  // Only initialize categories and todos when user is logged in
  useEffect(() => {
    if (loggedUser) {
      dispatch(initializeCategories(loggedUser.id));
      dispatch(initializeTodoList(loggedUser.id));
    }
  }, [dispatch, loggedUser]);

  const categories = useSelector((state) => state.categories);
  const todoList = useSelector((state) => state.todoList);

  // Get the todo item object from the id in the url
  const match = useMatch("/todos/:id");
  const todoItem = match
    ? todoList.find((item) => item.id === match.params.id)
    : null;

  return (
    <main className="app">
      <NavBar />

      <div className="divider"></div>

      <div className="container">
        <div className="sidebar">
          {loggedUser ? (
            <SideBar categories={categories} todoList={todoList} username={loggedUser.username} />
          ) : (
            <Login />
          )}
        </div>

        <div className="divider"></div>

        <div className="content">
          <Routes>
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

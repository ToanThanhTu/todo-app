import { useEffect } from "react"
import { Route, Routes, useMatch } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { initializeTodoList } from "./reducers/todoListReducer"
import { initializeCategories } from "./reducers/categoryReducer"
import { initializeUser } from "./reducers/userReducer"
import NavBar from "./components/NavBar/NavBar"
import SideBar from "./components/SideBar/SideBar"
import TodoList from "./components/TodoList/TodoList"
import Contacts from "./components/Contacts/Contacts"
import Login from "./components/Login/Login"
import TodoItemPage from "@/components/TodoItem/TodoItemPage"
import { Toaster } from "@/components/shadcn/sonner"
import { toast } from "sonner"
import Dashboard from "./components/Dashboard/Dashboard"
import Footer from "@/components/Footer/Footer"

export default function App() {
  const dispatch = useAppDispatch()
  const loggedUser = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  // Only initialize categories and todos when user is logged in
  useEffect(() => {
    if (loggedUser.id !== "") {
      toast.success(`Logged in as ${loggedUser.username}`, {
        closeButton: true,
      })
      dispatch(initializeCategories(loggedUser.id))
      dispatch(initializeTodoList(loggedUser.id))
    }
  }, [dispatch, loggedUser.id])

  const categories = useAppSelector((state) => state.categories)
  const todoList = useAppSelector((state) => state.todoList)

  // Get the todo item object from the id in the url
  const match = useMatch("/todos/:id")
  const todoItem = match ? todoList.find((item) => item.id === match.params.id) : null

  return (
    <main>
      <div className="app">
        <NavBar />

        <div className="divider"></div>

        <div className="container">
          <aside className="sidebar">
            {loggedUser.id !== "" ? (
              <SideBar categories={categories} todoList={todoList} username={loggedUser.username} />
            ) : (
              <Login />
            )}
          </aside>

          <div className="divider"></div>

          <section className="content">
            <Routes>
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/todos/:id" element={<TodoItemPage todoItem={todoItem} />} />
              <Route path="/todos" element={<TodoList todoList={todoList} />} />
              <Route path="/" element={<Dashboard user={loggedUser} todoList={todoList} />} />
            </Routes>
          </section>
        </div>

        <Footer />
      </div>

      <Toaster richColors />
    </main>
  )
}

import { useEffect } from "react"
import { Route, Routes, useMatch } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { initializeTodoList } from "./reducers/todoListReducer"
import { initializeCategories } from "./reducers/categoryReducer"
import { initializeUser } from "./reducers/userReducer"
import SideBar from "./components/SideBar/SideBar"
import TodoList from "./components/TodoListPage/TodoList"
import Contacts from "./components/Contacts/Contacts"
import Login from "./components/Login/Login"
import TodoItemPage from "@/components/TodoItemPage/TodoItemPage"
import { Toaster } from "@/components/shadcn/sonner"
import { toast } from "sonner"
import Dashboard from "./components/Dashboard/Dashboard"
import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import Categories from "@/components/Categories/Categories"

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

  // Get the todo item object from the id in the url
  const todoList = useAppSelector((state) => state.todoList)
  const match = useMatch("/todos/:id")
  const todoItem = match ? todoList.find((item) => item.id === match.params.id) : null

  return (
    <main>
      <div className="app">
        <Header />

        <div className="container">
          <SideBar user={loggedUser} />

          <section className="content">
            <Routes>
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/todos/:id" element={<TodoItemPage todoItem={todoItem} />} />
              <Route path="/todos" element={<TodoList todoList={todoList} />} />
              <Route path="/" element={<Dashboard user={loggedUser} todoList={todoList} />} />
            </Routes>
            <Footer />
          </section>
        </div>

      </div>

      <Toaster richColors />
    </main>
  )
}

import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { initializeTodoList } from "./reducers/todoListReducer"
import { initializeCategories } from "./reducers/categoryReducer"
import { initializeUser } from "./reducers/userReducer"
import SideBar from "./components/SideBar/SideBar"
import TodoList from "./components/TodoListPage/TodoList"
import Contact from "./components/Contact/Contact"
import { Toaster } from "@/components/shadcn/sonner"
import { toast } from "sonner"
import Dashboard from "./components/Dashboard/Dashboard"
import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import Categories from "@/components/Categories/Categories"
import SideBarMobile from "@/components/SideBar/SideBarMobile"

export default function App() {
  const [displaySideBar, setDisplaySideBar] = useState(false)

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

  useEffect(() => {
    if (displaySideBar) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [displaySideBar])

  return (
    <main>
      <div className="app">
        <Header />

        <div className="container">
          <SideBar user={loggedUser} />

          <SideBarMobile
            user={loggedUser}
            displaySideBar={displaySideBar}
            setDisplaySideBar={setDisplaySideBar}
          />

          <section className="content">
            <Routes>
              <Route path="/contacts" element={<Contact />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/todos" element={<TodoList />} />
              <Route path="/" element={<Dashboard user={loggedUser} />} />
            </Routes>
            <Footer />
          </section>
        </div>
      </div>

      <Toaster richColors />

      {displaySideBar && <div className="overlay" onClick={() => setDisplaySideBar(!displaySideBar)} />}
    </main>
  )
}

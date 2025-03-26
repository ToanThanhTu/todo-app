import { useState } from "react"
import { useAppSelector } from "@/hooks"
import styles from "./Nav.module.css"
import MenuIcon from "@mui/icons-material/Menu"
import DashboardIcon from "@mui/icons-material/Dashboard"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import ContactSupportIcon from "@mui/icons-material/ContactSupport"
import CategoryIcon from '@mui/icons-material/Category';
import NavItem from "@/components/Nav/NavItem"

export default function Nav() {
  const [displayNav, setDisplayNav] = useState(false)

  const loggedUser = useAppSelector((state) => state.user)

  // ==== Helper functions to avoid repeatitive codes =====
  const homeBtn = () => (
    <NavItem
      handleClick={() => setDisplayNav(false)}
      text="Dashboard"
      icon={<DashboardIcon fontSize="small" />}
      path="/"
    />
  )

  const todosBtn = () => (
    <NavItem
      handleClick={() => setDisplayNav(false)}
      text="ToDo Items"
      icon={<FormatListBulletedIcon fontSize="small" />}
      path="/todos"
    />
  )

  const categoriesBtn = () => (
    <NavItem
      handleClick={() => setDisplayNav(false)}
      text="ToDo Categories"
      icon={<CategoryIcon fontSize="small" />}
      path="/categories"
    />
  )

  const contactsBtn = () => (
    <NavItem
      handleClick={() => setDisplayNav(false)}
      text="Contact Me"
      icon={<ContactSupportIcon fontSize="small" />}
      path="/contacts"
    />
  )

  // ========================================================

  return (
    <div className={styles.navContainer}>
      {/* Navigation bar for screens over 768px */}
      <nav className={styles.navBar}>
        {homeBtn()}
        {loggedUser && todosBtn()}
        {loggedUser && categoriesBtn()}
        {contactsBtn()}
      </nav>

      {/* Navigation menu for screens below 768px */}
      <h4 className={styles.appName}>ToDo App</h4>

      <button className={styles.menuBtn} onClick={() => setDisplayNav(!displayNav)}>
        <MenuIcon fontSize="medium" />
      </button>

      {displayNav ? (
        <nav className={styles.navMenu}>
          {homeBtn()}
          {loggedUser && todosBtn()}
          {loggedUser && categoriesBtn()}
          {contactsBtn()}
        </nav>
      ) : null}
    </div>
  )
}

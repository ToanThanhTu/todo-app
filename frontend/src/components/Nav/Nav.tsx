import { useAppSelector } from "@/hooks"
import styles from "./Nav.module.css"
import DashboardIcon from "@mui/icons-material/Dashboard"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import ContactSupportIcon from "@mui/icons-material/ContactSupport"
import CategoryIcon from "@mui/icons-material/Category"
import NavItem from "@/components/Nav/NavItem"

export default function Nav({
  setDisplaySideBar,
}: {
  setDisplaySideBar?: (display: boolean) => void
}) {
  const loggedUser = useAppSelector((state) => state.user)

  // ==== Helper functions to avoid repeatitive codes =====
  const homeBtn = () => (
    <NavItem
      setDisplaySideBar={setDisplaySideBar}
      text="Dashboard"
      icon={<DashboardIcon fontSize="small" />}
      path="/"
    />
  )

  const todosBtn = () => (
    <NavItem
      setDisplaySideBar={setDisplaySideBar}
      text="ToDo Items"
      icon={<FormatListBulletedIcon fontSize="small" />}
      path="/todos"
    />
  )

  const categoriesBtn = () => (
    <NavItem
      setDisplaySideBar={setDisplaySideBar}
      text="ToDo Categories"
      icon={<CategoryIcon fontSize="small" />}
      path="/categories"
    />
  )

  const contactsBtn = () => (
    <NavItem
      setDisplaySideBar={setDisplaySideBar}
      text="Contact Me"
      icon={<ContactSupportIcon fontSize="small" />}
      path="/contacts"
    />
  )

  // ========================================================

  return (
    <div className={styles.navContainer}>
      <nav className={styles.navDesktopSideBar}>
        {homeBtn()}
        {loggedUser && todosBtn()}
        {loggedUser && categoriesBtn()}
        {contactsBtn()}
      </nav>
    </div>
  )
}

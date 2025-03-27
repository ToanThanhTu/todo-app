import LogoutIcon from "@mui/icons-material/Logout"
import styles from "./SideBar.module.css"
import { User } from "@/types"
import Nav from "@/components/Nav/Nav"
import { useAppDispatch } from "@/hooks"
import { logout } from "@/reducers/userReducer"
import { useNavigate } from "react-router-dom"
import NewUserButton from "@/components/Form/NewUser"
import Login from "@/components/Form/Login"

interface Props {
  user: User
}

function SideBar({ user }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <div>
      <div className={styles.sideBar}>
        {user.id !== "" ? (
          <>
            <div>
              <section className={styles.userInfo}>
                <img src="/avatar.webp" alt="placeholder avatar" className={styles.avatar} />
                <span>{user.username}</span>
              </section>

              <Nav />
            </div>

            <button className={styles.logoutBtn} onClick={handleLogout}>
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <div className={styles.loginContainer}>
            <Login />
            <NewUserButton />
          </div>
        )}
      </div>
    </div>
  )
}

export default SideBar

import LogoutIcon from "@mui/icons-material/Logout"
import styles from "./SideBarMobile.module.css"
import { User } from "@/types"
import Nav from "@/components/Nav/Nav"
import { useAppDispatch } from "@/hooks"
import { logout } from "@/reducers/userReducer"
import { useNavigate } from "react-router-dom"
import NewUserButton from "@/components/Form/NewUser"
import Login from "@/components/Form/Login"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

interface Props {
  user: User
  displaySideBar: boolean
  setDisplaySideBar: (display: boolean) => void
}

export default function SideBarMobile({ user, displaySideBar, setDisplaySideBar }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <div
      className={styles.sideBarMobileContainer}
      style={{ translate: displaySideBar ? "0px 0px" : "-101% 0px" }}
    >
      <div className={styles.sideBar}>
        {user.id !== "" ? (
          <>
            <div>
              <section className={styles.userInfo}>
                <img src="/avatar.webp" alt="placeholder avatar" className={styles.avatar} />
                <span>{user.username}</span>
              </section>

              <Nav setDisplaySideBar={setDisplaySideBar} />
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

      <button
        className={styles.menuBtn}
        onClick={() => {
          setDisplaySideBar(!displaySideBar)
        }}
      >
        <span className={styles.menuBtnIcon}>{displaySideBar ? <CloseIcon /> : <MenuIcon />}</span>
      </button>
    </div>
  )
}

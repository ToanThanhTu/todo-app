import { Link, useLocation } from "react-router-dom"
import styles from "./Nav.module.css"
import { JSX, useState } from "react"

interface Props {
  setDisplaySideBar?: (display: boolean) => void
  icon: JSX.Element
  text: string
  path: string
}

export default function NavItem({ setDisplaySideBar, icon, text, path }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const currentPath = useLocation().pathname

  return (
    <Link
      to={path}
      onClick={setDisplaySideBar ? () => setDisplaySideBar(false) : undefined}
      className={styles.navItem}
      style={
        currentPath === path
          ? { color: "var(--primary)", backgroundColor: "var(--background)" }
          : { color: isHovered ? "var(--primary)" : "var(--foreground-secondary)" }
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}

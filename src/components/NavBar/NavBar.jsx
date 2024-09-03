import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import navStyles from "./NavBar.module.css";
import { useState } from "react";

function NavBar() {
  const [displayNav, setDisplayNav] = useState(false);

  return (
    <div className={navStyles.navcontainer}>
      <nav className={navStyles.navbar}>
        <Link className={navStyles.item} to="/">
          HOME
        </Link>
        <Link className={navStyles.item} to="/todos">
          TODOS
        </Link>
        <Link className={navStyles.item} to="/contacts">
          CONTACTS
        </Link>
        <Link className={navStyles.item} to="/login">
          LOGIN
        </Link>
        <Link className={navStyles.item} to="/login">
          LOGOUT
        </Link>
      </nav>

      <button
        className={navStyles.menubutton}
        onClick={() => setDisplayNav(!displayNav)}
      >
        <MenuIcon />
      </button>

      {displayNav ? (
        <nav className={navStyles.navmenu}>
          <Link
            className={navStyles.item}
            to="/"
            onClick={() => setDisplayNav(!displayNav)}
          >
            HOME
          </Link>
          <Link
            className={navStyles.item}
            to="/todos"
            onClick={() => setDisplayNav(!displayNav)}
          >
            TODOS
          </Link>
          <Link
            className={navStyles.item}
            to="/contacts"
            onClick={() => setDisplayNav(!displayNav)}
          >
            CONTACTS
          </Link>
          <Link
            className={navStyles.item}
            to="/login"
            onClick={() => setDisplayNav(!displayNav)}
          >
            LOGIN
          </Link>
          <Link
            className={navStyles.item}
            to="/login"
            onClick={() => setDisplayNav(!displayNav)}
          >
            LOGOUT
          </Link>
        </nav>
      ) : null}
    </div>
  );
}

export default NavBar;

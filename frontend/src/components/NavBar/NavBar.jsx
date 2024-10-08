import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../reducers/userReducer";

import navStyles from "./NavBar.module.css";
import MenuIcon from "@mui/icons-material/Menu";

function NavBar() {
  const [displayNav, setDisplayNav] = useState(false);

  const loggedUser = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setDisplayNav(false);
    navigate("/");
  };

  // ==== Helper functions to avoid repeatitive codes =====
  const homeBtn = () => (
    <Link
      className={navStyles.item}
      to="/"
      onClick={() => setDisplayNav(false)}
    >
      HOME
    </Link>
  );

  const todosBtn = () =>
    loggedUser ? (
      <Link
        className={navStyles.item}
        to="/todos"
        onClick={() => setDisplayNav(false)}
      >
        TODOS
      </Link>
    ) : null;

  const contactsBtn = () => (
    <Link
      className={navStyles.item}
      to="/contacts"
      onClick={() => setDisplayNav(false)}
    >
      CONTACT ME
    </Link>
  );

  const logoutBtn = () =>
    loggedUser ? (
      <button className={navStyles.item} onClick={handleLogout}>
        LOGOUT
      </button>
    ) : null;

  // ========================================================

  return (
    <div className={navStyles.navcontainer}>
      {/* Navigation bar for screens over 600px */}
      <nav className={navStyles.navbar}>
        {homeBtn()}
        {todosBtn()}
        {contactsBtn()}
        {logoutBtn()}
      </nav>

      {/* Navigation menu for screens below 600px */}
      <h4 className={navStyles.appName}>ToDo App</h4>

      <button
        className={navStyles.menubutton}
        onClick={() => setDisplayNav(!displayNav)}
      >
        <MenuIcon fontSize="medium" />
      </button>

      {displayNav ? (
        <nav className={navStyles.navmenu}>
          {homeBtn()}
          {todosBtn()}
          {contactsBtn()}
          {logoutBtn()}
        </nav>
      ) : null}
    </div>
  );
}

export default NavBar;

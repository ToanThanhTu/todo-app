import { Link } from "react-router-dom";
import navStyles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={navStyles.navbar}>
      <Link className={navStyles.item} to="/">HOME</Link>
      <Link className={navStyles.item} to="/todos">TODOS</Link>
      <Link className={navStyles.item} to="/contacts">CONTACTS</Link>
      <Link className={navStyles.item} to="/login">LOGIN</Link>
      <Link className={navStyles.item} to="/login">LOGOUT</Link>
    </nav>
  );
}

export default NavBar;

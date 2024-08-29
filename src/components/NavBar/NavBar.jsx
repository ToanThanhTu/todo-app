import { Link } from "react-router-dom";
import navStyles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={navStyles.navbar}>
      <Link className={navStyles.item} to="/">HOME</Link>
      <Link className={navStyles.item} to="/todo">TODOS</Link>
      <Link className={navStyles.item} to="/todo">CONTACTS</Link>
      <Link className={navStyles.item} to="/todo">LOGIN</Link>
    </nav>
  );
}

export default NavBar;

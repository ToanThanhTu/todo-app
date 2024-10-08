import { useDispatch } from "react-redux";
import NewUserButton from "../NewUser/NewUser";
import loginFormStyles from "./Login.module.css";
import { login } from "../../reducers/userReducer";
import Notification from "../Notification/Notification";

function Login() {
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    dispatch(login(username, password));

    event.target.password.value = "";
    event.target.username.value = "";
  };

  return (
    <div className={loginFormStyles.login}>
      <h1>ToDo App</h1>

      <h2>Login</h2>

      <form className={loginFormStyles.form} onSubmit={handleLogin}>
        <Notification />

        <label htmlFor="username">Username: </label>
        <input id="username" type="text" name="username" />

        <label htmlFor="password">Password: </label>
        <input id="password" type="password" name="password" />

        <button type="submit">Login</button>
      </form>

      <NewUserButton />
    </div>
  );
}

export default Login;

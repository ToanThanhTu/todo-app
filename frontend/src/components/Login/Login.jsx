import loginFormStyles from "./Login.module.css";

function Login() {
  const login = (event) => {
    event.preventDefault();
    console.log('log in');    
  };

  return (
    <form className={loginFormStyles.form} onSubmit={login}>
      <h1>ToDo App</h1>

      <h2>Login</h2>

      <label htmlFor="username">Username: </label>
      <input id="username" type="text" />

      <label htmlFor="password">Password: </label>
      <input id="password" type="password" />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

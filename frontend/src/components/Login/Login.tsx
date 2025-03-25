import NewUserButton from "../NewUser/NewUser"
import loginFormStyles from "./Login.module.css"
import { login } from "../../reducers/userReducer"
import { useAppDispatch } from "@/hooks"
import { useForm, SubmitHandler } from "react-hook-form"
import { LoginCredentials } from "@/types"

function Login() {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginCredentials>()
  const onSubmit: SubmitHandler<LoginCredentials> = (data) => {
    dispatch(login(data.username, data.password))
    reset()
  }

  return (
    <div className={loginFormStyles.login}>
      <h1>ToDo App</h1>

      <h2>Login</h2>

      <form className={loginFormStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          placeholder="Username..."
          {...register("username", { required: true })}
        />
        {errors.username?.type === "required" && (
          <p className={loginFormStyles.error}>Username is required</p>
        )}

        <label htmlFor="password">Password: </label>
        <input
          id="password"
          placeholder="Password..."
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <p className={loginFormStyles.error}>Password is required</p>
        )}

        <button type="submit">Login</button>
      </form>

      <NewUserButton />
    </div>
  )
}

export default Login

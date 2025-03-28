import styles from "./Form.module.css"
import { login } from "../../reducers/userReducer"
import { useAppDispatch } from "@/hooks"
import { useForm, SubmitHandler } from "react-hook-form"
import { LoginCredentials } from "@/types"
import { Tile, TileHeader } from "@/components/Tile/Tile"

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
    <Tile
      style={{
        backgroundColor: "var(--background-secondary)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <TileHeader title="Login" fontSize="20px" />

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label htmlFor="username" className={styles.inputLabel}>
            Username:{" "}
          </label>
          <input
            id="username"
            placeholder="Username..."
            {...register("username", { required: true })}
          />
          {errors.username?.type === "required" && (
            <p className={styles.error}>Username is required</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="password" className={styles.inputLabel}>
            Password:{" "}
          </label>
          <input
            id="password"
            placeholder="Password..."
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p className={styles.error}>Password is required</p>
          )}
        </div>

        <button type="submit" className={styles.btn}>
          Login
        </button>
      </form>
    </Tile>
  )
}

export default Login

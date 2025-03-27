import { useRef, useState } from "react"

import { create } from "../../reducers/userReducer"

import ToggleableModal from "../Modal/ToggleableModal"
import { useAppDispatch } from "@/hooks"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginCredentials } from "@/types"

import styles from "./Form.module.css"

function NewUserButton() {
  const newUserFormRef = useRef<{ toggleShowModal: () => void } | null>(null)

  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const handleClose = () => {
    newUserFormRef.current?.toggleShowModal()
  }

  return (
    <ToggleableModal
      buttonName="Create new user"
      ref={newUserFormRef}
      btnStyle={{
        backgroundColor: isHovered ? "transparent" : "var(--background-secondary)",
        color: isHovered ? "var(--background-secondary)" : "var(--primary)",
        outline: isHovered ? "2px solid var(--background-secondary)" : "",
        fontWeight: "600",
        padding: "12px 24px",
      }}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
    >
      <NewUserForm onClose={handleClose} />
    </ToggleableModal>
  )
}

function NewUserForm({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginCredentials>()

  const onSubmit: SubmitHandler<LoginCredentials> = ({ username, password }: LoginCredentials) => {
    dispatch(create(username, password))
    reset()
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modal">
      <h1 className={styles.h1}>Create New User</h1>

      <div className={styles.inputContainer}>
        <label htmlFor="new-username" className={styles.inputLabel}>
          Username:
        </label>
        <input
          id="username"
          placeholder="Username..."
          {...register("username", { required: true, minLength: 3, maxLength: 20 })}
        />
        {errors.username?.type === "required" && (
          <p className={styles.error}>Username is required</p>
        )}
        {errors.username?.type === "minLength" ||
          (errors.username?.type === "maxLength" && (
            <p className={styles.error}>Username must be between 3 and 20 characters</p>
          ))}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="new-password" className={styles.inputLabel}>
          Password:
        </label>
        <input
          id="password"
          placeholder="Password..."
          {...register("password", { required: true, minLength: 4, maxLength: 20 })}
        />
        {errors.password?.type === "required" && (
          <p className={styles.error}>Password is required</p>
        )}
        {errors.password?.type === "minLength" ||
          (errors.password?.type === "maxLength" && (
            <p className={styles.error}>Password must be between 4 and 20 characters</p>
          ))}
      </div>

      <div className={styles.buttonsContainer}>
        <button type="submit" className={styles.btn}>
          Submit
        </button>
        <button type="button" onClick={onClose} className={styles.btn}>
          Close
        </button>
      </div>
    </form>
  )
}

export default NewUserButton

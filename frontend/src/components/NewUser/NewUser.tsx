import { useRef } from "react"

import { create } from "../../reducers/userReducer"

import ToggleableModal from "../Modal/ToggleableModal"
import { useAppDispatch } from "@/hooks"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginCredentials } from "@/types"

import NewUserFormStyles from "./NewUser.module.css"

function NewUserButton() {
  const newUserFormRef = useRef<{ toggleShowModal: () => void } | null>(null)

  const handleClose = () => {
    newUserFormRef.current?.toggleShowModal()
  }

  return (
    <ToggleableModal buttonName="Create new user" ref={newUserFormRef}>
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
      <h1>Create New User</h1>

      <div>
        <label htmlFor="new-username">Username:</label>
        <input
          id="username"
          placeholder="Username..."
          {...register("username", { required: true, minLength: 3, maxLength: 20 })}
        />
        {errors.username?.type === "required" && (
          <p className={NewUserFormStyles.error}>Username is required</p>
        )}
        {errors.username?.type === "minLength" ||
          (errors.username?.type === "maxLength" && (
            <p className={NewUserFormStyles.error}>Username must be between 3 and 20 characters</p>
          ))}
      </div>

      <div>
        <label htmlFor="new-password">Password:</label>
        <input
          id="password"
          placeholder="Password..."
          {...register("password", { required: true, minLength: 4, maxLength: 20 })}
        />
        {errors.password?.type === "required" && (
          <p className={NewUserFormStyles.error}>Password is required</p>
        )}
        {errors.password?.type === "minLength" ||
          (errors.password?.type === "maxLength" && (
            <p className={NewUserFormStyles.error}>Password must be between 4 and 20 characters</p>
          ))}
      </div>

      <div className="buttonsContainer">
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </form>
  )
}

export default NewUserButton

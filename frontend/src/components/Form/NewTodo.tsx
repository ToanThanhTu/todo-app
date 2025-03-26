import { useRef } from "react"

import { addTodoItem } from "../../reducers/todoListReducer"

import styles from "./Form.module.css"

import ToggleableModal from "../Modal/ToggleableModal"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { SubmitHandler, useForm } from "react-hook-form"
import { NewTodoItem } from "@/types"

function NewTodoButton() {
  const todoFormRef = useRef<{ toggleShowModal: () => void } | null>(null)

  const handleClose = () => {
    todoFormRef.current?.toggleShowModal()
  }

  return (
    <ToggleableModal buttonName="Add ToDo" ref={todoFormRef}>
      <NewTodoForm onClose={handleClose} />
    </ToggleableModal>
  )
}

function NewTodoForm({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch()
  const categories = useAppSelector((state) => state.categories)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewTodoItem>()

  const onSubmit: SubmitHandler<NewTodoItem> = ({ content, categoryId }: NewTodoItem) => {
    dispatch(addTodoItem(content, categoryId))
    reset()
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modal">
      <h1 className={styles.h1}>New ToDo Task</h1>

      <div className={styles.inputContainer}>
        <label htmlFor="task-content" className={styles.inputLabel}>
          Task content:
        </label>
        <input id="task-content" placeholder="What is your task?" {...register("content", { required: true, minLength: 3 })} />
        {errors.content?.type === "required" && (
          <span className={styles.error}>Content is required</span>
        )}
        {errors.content?.type === "minLength" && (
          <span className={styles.error}>Content must be at least 3 characters long</span>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="taskCategory" className={styles.inputLabel}>Task category:</label>
        <select id="taskCategory" {...register("categoryId", { required: true })}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <span className={styles.error}>Please select a category</span>}
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

export default NewTodoButton

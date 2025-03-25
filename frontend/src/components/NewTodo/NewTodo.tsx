import { useRef } from "react"

import { addTodoItem } from "../../reducers/todoListReducer"

import newTodoStyles from "./NewTodo.module.css"

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
    <ToggleableModal buttonName="New ToDo Item" ref={todoFormRef}>
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
      <h1>New ToDo Task</h1>

      <div className={newTodoStyles.inputs}>
        <label htmlFor="task-content">Task content:</label>
        <input id="task-content" {...register("content", { required: true, minLength: 3 })} />
        {errors.content?.type === "required" && <p>Content is required</p>}
        {errors.content?.type === "minLength" && <p>Content must be at least 3 characters long</p>}
      </div>

      <div className={newTodoStyles.inputs}>
        <label htmlFor="taskCategory">Task category:</label>
        <select id="taskCategory" {...register("categoryId", { required: true })}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <span>Please select a category</span>}
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

export default NewTodoButton

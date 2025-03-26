import { addCategory } from "../../reducers/categoryReducer"

import styles from "./Form.module.css"

import { SubmitHandler, useForm } from "react-hook-form"
import { Category, NewCategory } from "@/types"
import { useAppDispatch } from "@/hooks"
import { toast } from "sonner"
import { useRef } from "react"
import ToggleableModal from "@/components/Modal/ToggleableModal"

interface BtnProps {
  categories: Category[]
}

interface FormProps {
  categories: Category[]
  onClose: () => void
}

function NewCategoryButton({ categories }: BtnProps) {
  const todoFormRef = useRef<{ toggleShowModal: () => void } | null>(null)

  const handleClose = () => {
    todoFormRef.current?.toggleShowModal()
  }

  return (
    <ToggleableModal buttonName="Add Category" ref={todoFormRef}>
      <NewCategoryForm onClose={handleClose} categories={categories} />
    </ToggleableModal>
  )
}

function NewCategoryForm({ onClose, categories }: FormProps) {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewCategory>()

  const onSubmit: SubmitHandler<NewCategory> = ({ name }) => {
    if (categories.find((category) => category.name === name)) {
      toast.error("Your category already exists", {
        closeButton: true,
      })
      return
    }

    dispatch(addCategory(name))
    reset()
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modal">
      <h1 className={styles.h1}>New Category</h1>

      <div className={styles.inputContainer}>
        <label htmlFor="category-name" className={styles.inputLabel}>
          Category name:
        </label>
        <input
          id="category-name"
          placeholder="New category..."
          {...register("name", { required: true, minLength: 3 })}
        />
        {errors.name && errors.name.type === "required" && (
          <span className={styles.error}>Category name is required</span>
        )}
        {errors.name && errors.name.type === "minLength" && (
          <span className={styles.error}>Category name must be at least 3 characters long</span>
        )}
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

export default NewCategoryButton

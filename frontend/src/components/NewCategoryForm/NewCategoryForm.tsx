import { addCategory } from "../../reducers/categoryReducer"

import categoryFormStyles from "./NewCategoryForm.module.css"

import { SubmitHandler, useForm } from "react-hook-form"
import { Category, NewCategory } from "@/types"
import { useAppDispatch } from "@/hooks"
import { toast } from "sonner"

interface Props {
  categories: Category[]
  onClose: () => void
}

function NewCategoryForm({ onClose, categories }: Props) {
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
      <h1>New Category</h1>

      <div className={categoryFormStyles.categoryInput}>
        <label htmlFor="category-name">Category name:</label>
        <input id="category-name" {...register("name", { required: true, minLength: 3 })} />
        {errors.name && errors.name.type === "required" && (
          <span className="error">Category name is required</span>
        )}
        {errors.name && errors.name.type === "minLength" && (
          <span className="error">Category name must be at least 3 characters long</span>
        )}
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

export default NewCategoryForm

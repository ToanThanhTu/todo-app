import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import categoryService from "../services/categories"
import { Category } from "@/types"
import { AppThunk } from "@/store"
import { toast } from "sonner"

const initialState: Category[] = []

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (_state, action: PayloadAction<Category[]>) => {
      return action.payload
    },
    appendCategory: (state, action: PayloadAction<Category>) => {
      state.push(action.payload)
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const updatedCategory = action.payload

      return state.map((category) =>
        category.id !== updatedCategory.id ? category : updatedCategory
      )
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      const id = action.payload
      return state.filter((category) => category.id !== id)
    },
  },
})

export const { setCategories, appendCategory, updateCategory, removeCategory } =
  categorySlice.actions

export const initializeCategories = (userId: string): AppThunk => {
  return async (dispatch) => {
    try {
      const categories = await categoryService.getAllOfUser(userId)
      dispatch(setCategories(categories))
    } catch (error) {
      toast.error("Failed to fetch categories :(", {
        description: "Please try again later",
        closeButton: true,
      })
    }
  }
}

export const addCategory = (name: string): AppThunk => {
  const category = {
    name,
  }

  return async (dispatch) => {
    try {
      const savedCategory = await categoryService.create(category)
      dispatch(appendCategory(savedCategory))
      toast.success(`Category "${savedCategory.name}" created!`, {
        closeButton: true,
      })
    } catch (error) {
      toast.error("Failed to create category :(", {
        description: "Please try again later",
        closeButton: true,
      })
    }
  }
}

// After a todo item is created, it needs to be added to the corresponding category
export const addTodoToCategory = (todoId: string, categoryId: string): AppThunk => {
  return async (dispatch) => {
    try {
      const categoryToUpdate = await categoryService.getOne(categoryId)

      const updatedCategory = {
        ...categoryToUpdate,
        todos: categoryToUpdate.todos.concat(todoId),
      }

      await categoryService.update(categoryId, updatedCategory)
      dispatch(updateCategory(updatedCategory))
      toast.success(`New Todo Item added to category!`, {
        closeButton: true,
      })
    } catch (error) {
      toast.error("Failed to add todo to category :(", {
        description: "Please try again later",
        closeButton: true,
      })
    }
  }
}

export const deleteCategory = (category: Category): AppThunk => {
  return async (dispatch) => {
    try {
      await categoryService.deleteObject(category.id)
      dispatch(removeCategory(category.id))
      toast.success(`Category "${category.name}" deleted!`, {
        closeButton: true,
      })
    } catch (error) {
      toast.error("Failed to delete category :(", {
        description: "Please try again later",
        closeButton: true,
      })
    }
  }
}

export default categorySlice.reducer

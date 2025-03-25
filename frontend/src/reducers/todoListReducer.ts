import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import todoService from "../services/todos"

import { addTodoToCategory } from "./categoryReducer"
import { NewTodoItem, Status, TodoItem } from "@/types"
import { AppThunk } from "@/store"
import { toast } from "sonner"

const initialState: TodoItem[] = []

const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setTodoList: (_state, action: PayloadAction<TodoItem[]>) => {
      return action.payload
    },
    appendTodoItem: (state, action: PayloadAction<TodoItem>) => {
      state.push(action.payload)
    },
    updateTodo: (state, action: PayloadAction<TodoItem>) => {
      const updatedTodo = action.payload

      return state.map((item) => (item.id !== updatedTodo.id ? item : updatedTodo))
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload
      return state.filter((todo) => todo.id !== id)
    },
  },
})

export const { setTodoList, appendTodoItem, updateTodo, removeTodo } = todoListSlice.actions

export const initializeTodoList = (userId: string): AppThunk => {
  return async (dispatch) => {
    try {
      const todoList = await todoService.getAllOfUser(userId)
      dispatch(setTodoList(todoList))
    } catch (error) {
      toast.error("Failed to fetch todos :(", {
        description: "Please try again later.",
        closeButton: true,
      })
    }
  }
}

export const addTodoItem = (content: string, categoryId: string): AppThunk => {
  const newTodoItem: NewTodoItem = {
    content,
    categoryId,
    status: Status.ACTIVE,
  }

  return async (dispatch) => {
    try {
      const savedItem = await todoService.create(newTodoItem)

      dispatch(appendTodoItem(savedItem))

      // add the new todo to the corresponding category
      dispatch(addTodoToCategory(savedItem.id, categoryId))
      toast.success("New Todo Item added successfully!", {
        closeButton: true,
      })
    } catch (error) {
      toast.error("Failed to add New Todo Item :(", {
        description: "Please try again later.",
        closeButton: true,
      })
    }
  }
}

export const updateStatus = (todo: TodoItem, status: Status): AppThunk => {
  const updatedTodo = {
    ...todo,
    status,
  }

  return async (dispatch) => {
    try {
      await todoService.update(updatedTodo.id, updatedTodo)
      dispatch(updateTodo(updatedTodo))
      toast.success("Todo Item updated successfully!", {
        closeButton: true,
      })
    } catch (error) {
      toast.error("Failed to update Todo Item :(", {
        description: "Please try again later.",
        closeButton: true,
      })
    }
  }
}

export const deleteTodo = (id: string): AppThunk => {
  return async (dispatch) => {
    try {
      await todoService.deleteObject(id)
      dispatch(removeTodo(id))
      toast.success("Todo Item deleted successfully!", {
        closeButton: true,
      })
    } catch (error) {
      toast.error("Failed to delete Todo Item :(", {
        description: "Please try again later.",
        closeButton: true,
      })
    }
  }
}

export default todoListSlice.reducer

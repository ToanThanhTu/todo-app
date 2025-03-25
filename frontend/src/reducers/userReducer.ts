import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import loginService from "../services/login"
import userService from "../services/users"
import { setToken } from "../services/auth"

import { LoginCredentials, User } from "@/types"
import { AppThunk } from "@/store"
import { toast } from "sonner"

const initialState: User = {
  id: "",
  username: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<User>) => {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const initializeUser = (): AppThunk => {
  return (dispatch) => {
    const loggedUser = window.localStorage.getItem("loggedTodoappUser")

    if (loggedUser) {
      const localUserProperties = JSON.parse(loggedUser)
      setToken(localUserProperties.token)
      dispatch(setUser(localUserProperties.user))
    } else {
      dispatch(
        setUser({
          id: "",
          username: "",
        })
      )
    }
  }
}

export const login = (username: string, password: string): AppThunk => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login({ username, password })

      // set user data in local storage
      window.localStorage.setItem("loggedTodoappUser", JSON.stringify(loggedUser))

      dispatch(setUser(loggedUser.user))
      setToken(loggedUser.token)
    } catch (error: any) {
      toast.error("Failed to Login :(", {
        description: "Please check your username and password",
        closeButton: true,
      })
    }
  }
}

export const logout = (): AppThunk => {
  return (dispatch) => {
    try {
      window.localStorage.removeItem("loggedTodoappUser")
      dispatch(setUser({ id: "", username: "" }))
      setToken("")
      toast.success("Logged out successfully", {
        closeButton: true,
      })
    } catch (error) {
      toast.error("Failed to Logout :(", {
        description: "Please try again",
        closeButton: true,
      })
    }
  }
}

export const create = (username: string, password: string) => {
  const user: LoginCredentials = {
    username,
    password,
  }

  return async () => {
    try {
      const newUser = await userService.create(user)
      toast.success(`New User "${newUser.username}" created successfully`, {
        closeButton: true,
      })
    } catch (error) {
      toast.error("Failed to create user :(", {
        description: "Please try again later.",
        closeButton: true,
      })
    }
  }
}

export default userSlice.reducer

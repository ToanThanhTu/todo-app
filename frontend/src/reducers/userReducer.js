import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import userService from "../services/users";
import { setToken } from "../services/auth";

import { displayNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUser = window.localStorage.getItem("loggedTodoappUser");

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setToken(user.token);
      dispatch(setUser(user));
    } else {
      dispatch(setUser(null));
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login({ username, password });

      // set user data in local storage
      window.localStorage.setItem(
        "loggedTodoappUser",
        JSON.stringify(loggedUser)
      );

      dispatch(setUser(loggedUser));
      setToken(loggedUser.token);
    } catch (exception) {
      dispatch(
        displayNotification({
          message: exception.response.data.error,
          type: "error",
        })
      );
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedTodoappUser");
    dispatch(setUser(null));
  };
};

export const create = (username, password) => {
  const user = {
    username,
    password,
  };

  return async () => {
    await userService.create(user);
  };
};

export default userSlice.reducer;

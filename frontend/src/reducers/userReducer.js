import { createSlice } from "@reduxjs/toolkit";

import tokenService from "../services/token";
import loginService from "../services/login";

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
      tokenService.setToken(user.token);
      dispatch(setUser(user));
    } else {
      dispatch(setUser(null));
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    const loggedUser = await loginService.login({ username, password });

    // set user data in local storage
    window.localStorage.setItem(
      "loggedTodoappUser",
      JSON.stringify(loggedUser)
    );

    dispatch(setUser(loggedUser));
    tokenService.setToken(loggedUser.token);
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedTodoappUser");
    dispatch(setUser(null));
  };
};

export default userSlice.reducer;

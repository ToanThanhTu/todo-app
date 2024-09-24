import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userListSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    appendUser(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setUsers, appendUser } = userListSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const create = (username, password) => {
  const user = {
    username,
    password,
  };

  return async (dispatch) => {
    const savedUser = await userService.create(user);
    dispatch(appendUser(savedUser));
  };
};

export default userListSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

import todoService from "../services/todo";

import { generateId } from "./reducerHelper";

const todoListReducer = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    setTodoList(state, action) {
      return action.payload;
    },
    appendTodoItem(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setTodoList, appendTodoItem } = todoListReducer.actions;

export const initializeTodoList = () => {
  return async (dispatch) => {
    const todoList = await todoService.getAll();
    dispatch(setTodoList(todoList));
  };
};

export const addTodoItem = (content) => {
  const item = {
    content,
    id: generateId(),
  };

  return async (dispatch) => {
    await todoService.create(item);
    dispatch(appendTodoItem(item));
  };
};

export default todoListReducer.reducer;

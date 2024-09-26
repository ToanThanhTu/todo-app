import { createSlice } from "@reduxjs/toolkit";

import todoService from "../services/todos";

import { addTodoToCategory } from "./categoryReducer";

const todoListSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    setTodoList(state, action) {
      return action.payload;
    },
    appendTodoItem(state, action) {
      state.push(action.payload);
    },
    updateTodo(state, action) {
      const updatedTodo = action.payload;

      return state.map((item) =>
        item.id !== updatedTodo.id ? item : updatedTodo
      );
    },
    removeTodo(state, action) {
      const id = action.payload;
      return state.filter((todo) => todo.id !== id);
    },
  },
});

export const { setTodoList, appendTodoItem, updateTodo, removeTodo } =
  todoListSlice.actions;

export const initializeTodoList = (userid) => {
  return async (dispatch) => {
    const todoList = await todoService.getAllOfUser(userid);
    dispatch(setTodoList(todoList));
  };
};

export const addTodoItem = (content, category, status) => {
  const item = {
    content,
    category,
    status,
  };

  return async (dispatch) => {
    const savedItem = await todoService.create(item);

    dispatch(appendTodoItem(savedItem));
    dispatch(addTodoToCategory(savedItem.id, category));
  };
};

export const updateStatus = (todo, status) => {
  const updatedTodo = {
    ...todo,
    status,
  };

  return async (dispatch) => {
    await todoService.update(updatedTodo.id, updatedTodo);
    dispatch(updateTodo(updatedTodo));
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    await todoService.deleteObject(id);
    dispatch(removeTodo(id));
  };
};

export default todoListSlice.reducer;

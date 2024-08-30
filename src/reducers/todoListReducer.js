import { createSlice } from "@reduxjs/toolkit";

import todoService from "../services/todo";

import { generateId } from "./reducerHelper";
import { addTodoToCategory } from "./categoryReducer";

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
  todoListReducer.actions;

export const initializeTodoList = () => {
  return async (dispatch) => {
    const todoList = await todoService.getAll();
    dispatch(setTodoList(todoList));
  };
};

export const addTodoItem = (content, category, status) => {
  const item = {
    content,
    category,
    status,
    id: generateId(),
  };

  return async (dispatch) => {
    await todoService.create(item);
    dispatch(appendTodoItem(item));
    dispatch(addTodoToCategory(item.id, category));
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

export default todoListReducer.reducer;

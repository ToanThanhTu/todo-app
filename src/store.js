import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./reducers/todoListReducer";
import categoryReducer from "./reducers/categoryReducer";

const store = configureStore({
  reducer: {
    todoList: todoListReducer,
    categories: categoryReducer,
  },
});

export default store;

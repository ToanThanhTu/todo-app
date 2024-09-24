import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./reducers/todoListReducer";
import categoryReducer from "./reducers/categoryReducer";
import filterReducer from "./reducers/filterReducer";

const store = configureStore({
  reducer: {
    todoList: todoListReducer,
    categories: categoryReducer,
    filter: filterReducer
  },
});

export default store;

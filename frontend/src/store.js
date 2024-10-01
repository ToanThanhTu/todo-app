import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./reducers/todoListReducer";
import categoryReducer from "./reducers/categoryReducer";
import filterReducer from "./reducers/filterReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    todoList: todoListReducer,
    categories: categoryReducer,
    filter: filterReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;

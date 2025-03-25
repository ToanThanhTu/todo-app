import { configureStore, ThunkAction, UnknownAction } from "@reduxjs/toolkit"
import todoListReducer from "./reducers/todoListReducer"
import categoryReducer from "./reducers/categoryReducer"
import filterReducer from "./reducers/filterReducer"
import userReducer from "./reducers/userReducer"

export const store = configureStore({
  reducer: {
    todoList: todoListReducer,
    categories: categoryReducer,
    filter: filterReducer,
    user: userReducer,
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>

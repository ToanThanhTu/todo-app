import { createSlice } from "@reduxjs/toolkit";

import categoryService from "../services/categories";
import { generateId } from "./reducerHelper";

const categorySlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    setCategories(state, action) {
      return action.payload;
    },
    appendCategory(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setCategories, appendCategory } = categorySlice.actions;

export const initializeCategories = () => {
  return async (dispatch) => {
    const categories = await categoryService.getAll();
    dispatch(setCategories(categories));
  };
};

export const addCategory = (name) => {
  const category = {
    name,
    id: generateId(),
  };

  return async (dispatch) => {
    await categoryService.create(category);
    dispatch(appendCategory(category));
  };
};

export default categorySlice.reducer;

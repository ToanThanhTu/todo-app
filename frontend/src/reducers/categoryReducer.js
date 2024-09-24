import { createSlice } from "@reduxjs/toolkit";

import categoryService from "../services/categories";

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
    updateCategory(state, action) {
      const updatedCategory = action.payload;

      return state.map((category) =>
        category.id !== updatedCategory.id ? category : updatedCategory
      );
    },
    removeCategory(state, action) {
      const id = action.payload;
      return state.filter((category) => category.id !== id);
    },
  },
});

export const { setCategories, appendCategory, updateCategory, removeCategory } =
  categorySlice.actions;

export const initializeCategories = () => {
  return async (dispatch) => {
    const categories = await categoryService.getAll();
    dispatch(setCategories(categories));
  };
};

export const addCategory = (name) => {
  const category = {
    name,
    todos: [],
  };

  return async (dispatch) => {
    const savedCategory = await categoryService.create(category);
    dispatch(appendCategory(savedCategory));
  };
};

export const addTodoToCategory = (todoId, categoryId) => {
  return async (dispatch) => {
    const categoryToUpdate = await categoryService.getOne(categoryId);

    const updatedCategory = {
      ...categoryToUpdate,
      todos: categoryToUpdate.todos.concat(todoId),
    };

    await categoryService.update(categoryId, updatedCategory);
    dispatch(updateCategory(updatedCategory));
  };
};

export const deleteCategory = (category) => {
  return async (dispatch) => {
    await categoryService.deleteObject(category.id);
    dispatch(removeCategory(category.id));
  };
};

export default categorySlice.reducer;

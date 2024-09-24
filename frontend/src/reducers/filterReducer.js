import { createSlice } from "@reduxjs/toolkit";

import { STATUS } from "../constants/statusConstants";

const filterSlice = createSlice({
  name: "filter",
  initialState: { category: '0', status: STATUS.ACTIVE },
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export const applyFilter = (filter) => {
  return (dispatch) => {
    dispatch(setFilter(filter));
  };
};

export default filterSlice.reducer;

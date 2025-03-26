import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Filter, StatusFilterSelect } from "@/types";
import { AppThunk } from "@/store";

const initialState = { category: '', status: StatusFilterSelect.ALL };

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (_state, action: PayloadAction<Filter>) => {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export const applyFilter = (filter: Filter): AppThunk => {
  return (dispatch) => {
    dispatch(setFilter(filter));
  };
};

export default filterSlice.reducer;

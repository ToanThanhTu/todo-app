import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const displayNotification = (notification) => {
  return (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;

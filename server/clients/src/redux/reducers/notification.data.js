import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    value: {visible:false,
            message:""},
  },
  reducers: {
    ShowNotification(state, action) {
      state.value = {...action.payload};
    },
  },
});

export const { ShowNotification } =notificationSlice.actions;

export default notificationSlice.reducer;

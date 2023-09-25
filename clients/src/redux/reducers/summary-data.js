import { createSlice } from "@reduxjs/toolkit";

const summarySlice = createSlice({
  name: "summary",
  initialState: {
    summary: "",
  },
  reducers: {
    addSummary(state, action) {
      state.summary = action.payload.summary;
    },
  },
});

export const summaryAction = summarySlice.actions;
export default summarySlice;

import { createSlice } from "@reduxjs/toolkit";

const DetailsSlice = createSlice({
  name: "details",
  initialState: {
    details: [],
  },
  reducers: {
    addData(state, action) {
      const newData = action.payload;
      state.details = [...newData];
    },
  },
});

export const detailsAction = DetailsSlice.actions;
export default DetailsSlice;

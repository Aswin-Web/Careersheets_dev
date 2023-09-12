import { createSlice } from "@reduxjs/toolkit";

export const allJobsSlice = createSlice({
  name: "allJobs",
  initialState: {
    value: [],
  },
  reducers: {
    AddJobsUser(state, action) {
      state.value = [...action.payload];
    },
    updateJobsUser(state, action) {
      const afterUpdate = state.value.map((x) => {
        if (x._id === action.payload.job_id) {
          return { ...action.payload.jobDetails };
        } else {
          return x;
        }
      });
      state.value = [...afterUpdate];
    },
  },
});

export const { AddJobsUser, updateJobsUser } = allJobsSlice.actions;

export default allJobsSlice.reducer;

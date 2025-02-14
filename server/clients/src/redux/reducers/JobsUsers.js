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
    removeAJob(state, action) {
      const availableJobs = state.value.filter(
        (job) => job._id !== action.payload
      );
      state.value = [...availableJobs];
    },
  },
});

export const { AddJobsUser, updateJobsUser, removeAJob } = allJobsSlice.actions;

export default allJobsSlice.reducer;

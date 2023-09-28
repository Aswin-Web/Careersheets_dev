import { createSlice } from "@reduxjs/toolkit";

export const allJobsSlice = createSlice({
  name: "allJobs",
  initialState: {
    value: [],
  },
  reducers: {
    AddJobs(state, action) {
      state.value = [...action.payload];
    },
    DisAbleJobs(state, action) {
      const afterDisable = state.value.map((x) => {
        if (x._id === action.payload) {
          x.isClosed = !x.isClosed;
        }
      });
      state.value = [...afterDisable];
    },
    updateJobs(state, action) {
      const afterUpdate = state.value.map((x) => {
        if (x._id === action.payload.job_id) {
          return { ...action.payload.jobDetails };
        } else {
          return x;
        }
      });
      state.value = [...afterUpdate];
    },
    AddNewJob(state, action) {
      state.value = [action.payload, ...state.value];
    },
  },
});

export const { AddJobs, DisAbleJobs, updateJobs, AddNewJob } =
  allJobsSlice.actions;

export default allJobsSlice.reducer;

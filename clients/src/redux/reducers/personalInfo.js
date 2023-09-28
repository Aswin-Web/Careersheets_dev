import { createSlice } from "@reduxjs/toolkit";

const personalSlice = createSlice({
  name: "personal",
  initialState: {
    languages: [],
    dob: "",
    hometown: "",
    gender: "",
    fullName: "",
    phone: "",
  },
  reducers: {
    addInfo(state, action) {
      state.fullName = action.payload.fullName;
      state.dob = action.payload.dob;
      state.hometown = action.payload.hometown;
      state.gender = action.payload.gender;
      state.phone = action.payload.phone;
      state.languages = action.payload.languages.map((language) => language);
    },
  },
});

export const personalActions = personalSlice.actions;
export default personalSlice;
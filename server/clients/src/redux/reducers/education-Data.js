import { createSlice } from "@reduxjs/toolkit";

const EducationSlice = createSlice({
  name: "education",
  initialState: {
    items: [],
    error: false,
    message: "",
  },
  reducers: {
    removeEdu(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item._id !== id);
    },

    replaceEdu(state, action) {
      const data = action.payload;
      state.items = [...data];
    },

    addEducation(state, action) {
      const newEdu = action.payload;
      if (newEdu) {
        state.items.unshift({
          collegeName: newEdu.collegeName,
          graduated: newEdu.graduated,
          degree: newEdu.degree,
          graduationYear: newEdu.graduationYear,
          registerNumber: newEdu.registerNumber,
          _id: newEdu._id,
          stream: newEdu.stream,
        });
      }
      state.error = false;
    },

    updateEducation(state, action) {
      const updatedEdu = action.payload;
      const index = state.items.findIndex((item) => item._id === updatedEdu._id);
      console.log("aaaaaaaaa", index)

      if (index !== -1) {
        console.log("aaaaaaaaa", state.items[index])
        state.items[index] = {
          ...state.items[index],
          ...updatedEdu, 
        };
      }
      state.error = false;
    },

    eduError(state, action) {
      const err = action.payload;
      state.message = err;
      state.error = true;
    },
  },
});

export const educationActions = EducationSlice.actions;
export default EducationSlice;
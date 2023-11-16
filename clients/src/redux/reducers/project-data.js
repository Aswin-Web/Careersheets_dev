import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    items: [],
  },
  reducers: {
    addProject(state, action) {
      const newProject = action.payload;
      if (newProject) {
        state.items.unshift({
          projectTitle: newProject.projectTitle,
          projectDomain: newProject.projectDomain,
          projectDescription: newProject.projectDescription,
          projectSkills: newProject.projectSkills,
          _id: newProject._id,
        });
      }
    },
    removeProject(state, action) {
      const id = action.payload;
      //   const existingEdu=state.items.find((item)=>item._id===id)
      state.items = state.items.filter((item) => item._id !== id);
    },
    replaceProject(state, action) {
      const data = action.payload;
      state.items = [...data];
    },
  },
});

export const projectActions = projectSlice.actions;
export default projectSlice;

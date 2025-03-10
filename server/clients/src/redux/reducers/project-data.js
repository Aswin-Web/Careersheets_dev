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
          startDate: newProject.startDate,
          endDate: newProject.endDate, 

          _id: newProject._id,
        });
      }
    },
    updateProject(state, action) {
      const { _id, projectTitle, projectDescription, projectDomain, projectSkills,startDate,endDate } = action.payload;
      const index = state.items.findIndex((item) => item._id === _id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          projectTitle,
          projectDescription,
          projectDomain,
          projectSkills,
          startDate, 
          endDate,
        };
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

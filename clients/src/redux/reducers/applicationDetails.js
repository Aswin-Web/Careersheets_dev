import { createSlice } from "@reduxjs/toolkit";

const applicationDetailSlice=createSlice({
    name:"applicationDetails",
    initialState:{
        values:[],
        
    },
    reducers:{
        addDetails(state,action){
            const application=action.payload;
            state.values=[...application]
            
        }
    }
})
export const applicationDetailAction=applicationDetailSlice.actions;
export default applicationDetailSlice

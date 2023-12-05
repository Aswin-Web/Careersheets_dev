import { SliderValueLabel } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

const skillSlice=createSlice({
    name:"skill",
    initialState:{
        skills:[],
        error:false,
        message:""
    },
    reducers:{
        addSkill(state,action){
            const value=action.payload;
            if(SliderValueLabel){
                state.skills.push({
                    skill:value.skill,
                    level:value.level,
                    _id:value._id
                })
                state.error=false;
            }
        },
        removeSkill(state,action){
            const data=action.payload
            const skillId=data._id

            state.skills = state.skills.filter((skill) => skill._id !== skillId);
        },
        replaceSkill(state, action) {
            const data = action.payload;
            state.skills = [...data];
          },
        
        skillError(state,action){
            const err=action.payload;
            state.message=err
            state.error=true
        }
    }
})

export const skillActions=skillSlice.actions
export default skillSlice
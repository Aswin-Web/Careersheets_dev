import { createSlice } from "@reduxjs/toolkit";


const roleSlice=createSlice({
    name:"status",
    initialState:{
        role:"",
    },
    reducers:{
        changeRole(state,action){
            state.role=action.payload
        },

    }
})

export const roleActions=roleSlice.actions;
export default roleSlice
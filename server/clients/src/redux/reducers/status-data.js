import { createSlice } from "@reduxjs/toolkit";


const statusSlice=createSlice({
    name:"status",
    initialState:{
        status:"",
    },
    reducers:{
        changeStatus(state,action){
            state.status=action.payload
        },

    }
})

export const statusActions=statusSlice.actions;
export default statusSlice
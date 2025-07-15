import { createSlice } from "@reduxjs/toolkit";

const collegeAdminData=createSlice({
    name:"collegeAdminData",
    initialState:{
        value:{},
    },
    reducers:{
        addValue(state,action){
            const data=action.payload;
            state.value={...data}
        }
    }
})
export const collegeAdminAction=collegeAdminData.actions;
export default collegeAdminData;
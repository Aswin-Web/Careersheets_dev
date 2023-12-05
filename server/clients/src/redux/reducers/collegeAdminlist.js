import { createSlice } from "@reduxjs/toolkit";

export const CollegeAdminListSlice = createSlice({
  name: "collegeAdminlist",
  initialState: {
    value: [],
  },
  reducers: {
    AddCollegeList(state, action) {
      state.value = [...action.payload];
    },
    EditCollegeList(state,action){
      const modifyDocunment=state.value.map(item=>{
        if (item._id===action.payload){
          item.collegeVerification = !item.collegeVerification;
          return item
        }else{
          return item
        }
        state.value=[...modifyDocunment]
      })
    }
   
  },
});

export const { AddCollegeList, EditCollegeList } = CollegeAdminListSlice.actions;

export default CollegeAdminListSlice.reducer;

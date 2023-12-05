import { createSlice } from "@reduxjs/toolkit";

export const applicationSlice = createSlice({
  name: "application",
  initialState: {
    value: [],
  },
  reducers: {
    AddApplication(state, action) {
      state.value = [...action.payload, ...state.value];
    },
    AddItemToStatus(state, action) {
      const arr = state.value;
      
      const update = arr.map((item) => {
        if (item._id === action.payload.postID) {
           (item.status = [...item.status,action.payload]);
            return item
        } else {
          return item;
        }
      });
      state.value=[...update]
    },
    DeleteStatus(state,action){
      const newData=state.value.map(item=>{
        if (item._id===action.payload._id){
          return action.payload
        }else{
          return item
        }

      })
      state.value=[...newData]
    },
    AddSingleApplication(state, action) {
      state.value = [action.payload,...state.value ];
    }
  },
});

export const { AddApplication, AddItemToStatus,DeleteStatus,AddSingleApplication } = applicationSlice.actions;

export default applicationSlice.reducer;

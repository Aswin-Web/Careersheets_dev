import { createSlice } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem("user"));
const checkLocalStorage = () => {
  if (token === null) {
      const userInfo = {
        token:''
      };
    return userInfo;
  } else {
    const userInfo = {
      token:token
    };
    return userInfo;
  }
};

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    value: checkLocalStorage()
  },
  reducers: {
    changeUserInfo(state, action) {
      state.value = action.payload;
    },
  },
});

export const { changeUserInfo } = userSlice.actions;

export default userSlice.reducer;

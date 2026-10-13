import { createSlice } from "@reduxjs/toolkit";

interface Authstate {
  userInfo: {
    _id: string;
  } | null;
}

const initialState: Authstate = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    removeUserInfo: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUserInfo, removeUserInfo } = authSlice.actions;
export default authSlice.reducer;

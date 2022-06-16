import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPath: "/",
  prevPath: "/",
};

const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    newPath: (state, action) => {
      state.currentPath = action.payload;
    },
    savePath: (state, action) => {
      state.prevPath = action.payload;
    },
  },
});

export default pathSlice.reducer;
export const { newPath, savePath } = pathSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPath: "/",
};

const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    newPath: (state, action) => {
      state.currentPath = action.payload;
    },
  },
});

export default pathSlice.reducer;
export const { newPath } = pathSlice.actions;

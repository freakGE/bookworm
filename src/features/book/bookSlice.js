import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeBook: {},
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.activeBook = action.payload;
    },
    removeBook: (state, action) => {
      state.activeBook = {};
    },
  },
});

export default bookSlice.reducer;
export const { addBook, removeBook } = bookSlice.actions;

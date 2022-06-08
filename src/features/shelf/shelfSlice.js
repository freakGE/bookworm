import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookOnShelf: [],
};

const shelfSlice = createSlice({
  name: "shelf",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.bookOnShelf.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.bookOnShelf = state.bookOnShelf.filter(
        item => item.id !== action.payload
      );
    },
  },
});

export default shelfSlice.reducer;
export const { addToFavorites, removeFromFavorites } = shelfSlice.actions;

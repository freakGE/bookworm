import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listOfGenre: [],
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    addGenre: (state, action) => {
      state.listOfGenre.push(action.payload);
      state.listOfGenre = [...new Set(state.listOfGenre)]; //removes duplicates
    },
    removeGenre: (state, action) => {
      state.listOfGenre = state.listOfGenre.filter(
        item => item !== action.payload
      );
    },
    clearGenre: (state, action) => {
      state.listOfGenre = [];
    },
  },
});

export default genreSlice.reducer;
export const { addGenre, removeGenre, clearGenre } = genreSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSearch: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    newSearch: (state, action) => {
      state.currentSearch = action.payload;
    },
    clearSearch: state => {
      state.currentSearch = "";
    },
  },
});

export default searchSlice.reducer;
export const { newSearch, clearSearch } = searchSlice.actions;

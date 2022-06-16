import { configureStore } from "@reduxjs/toolkit";

import shelfReducer from "../features/shelf/shelfSlice";
import genreReducer from "../features/genre/genreSlice";
import pathReducer from "../features/path/pathSlice";
import searchReducer from "../features/search/searchSlice";
import bookReducer from "../features/book/bookSlice";

const store = configureStore({
  reducer: {
    shelf: shelfReducer,
    genre: genreReducer,
    path: pathReducer,
    search: searchReducer,
    book: bookReducer,
  },
});

export default store;

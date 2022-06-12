import { configureStore } from "@reduxjs/toolkit";

import shelfReducer from "../features/shelf/shelfSlice";
import genreReducer from "../features/genre/genreSlice";
import pathReducer from "../features/path/pathSlice";

const store = configureStore({
  reducer: {
    shelf: shelfReducer,
    genre: genreReducer,
    path: pathReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";

import shelfReducer from "../features/shelf/shelfSlice";

const store = configureStore({
  reducer: {
    shelf: shelfReducer,
  },
});

export default store;

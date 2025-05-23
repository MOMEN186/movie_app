// app/store.js (or wherever you configure the store)
import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "../features/language/LanguageSlice";
import watchListReducer from "../features/WatchList/WatchListSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    watchList: watchListReducer,  
  },
});

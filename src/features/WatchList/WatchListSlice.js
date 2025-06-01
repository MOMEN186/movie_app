// features/WatchList/WatchListSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],  // array of objects with id and mediaType
};

const watchListSlice = createSlice({
  name: "watchList",    // clearer name
  initialState,
  reducers: {
    add(state, action) {
      const { movie, mediaType } = action.payload;
      console.log(action.payload)
      const exists = state.value.some(item => item.id === movie.id && item.mediaType === mediaType);
      if (!exists) {
        state.value.push({ movie, mediaType });
      }
    },
    remove(state, action) {
      const { movie, mediaType } = action.payload;
      state.value = state.value.filter(item => !(item.movie.id=== movie.id && item.mediaType === mediaType));
    },
  },
});

export const { add, remove } = watchListSlice.actions;
export const selectWatchList = state => state.watchList.value;
export default watchListSlice.reducer;

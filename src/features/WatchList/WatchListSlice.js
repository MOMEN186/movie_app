// features/WatchList/WatchListSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],  // array of movie IDs
};

const watchListSlice = createSlice({
  name: "watchList",    // clearer name
  initialState,
  reducers: {
    add(state, action) {
      const id = action.payload;
      if (!state.value.includes(id)) {
        state.value.push(id);
      }
    },
    remove(state, action) {
      const id = action.payload;
      state.value = state.value.filter(itemId => itemId !== id);
    },
  },
});

export const { add, remove } = watchListSlice.actions;
export const selectWatchList = state => state.watchList.value;
export default watchListSlice.reducer;

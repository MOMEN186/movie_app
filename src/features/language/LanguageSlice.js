import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "en-US",
};

export const LanguageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLanguage } = LanguageSlice.actions;
export const selectCount = (state) => state.language.value;
export default LanguageSlice.reducer;

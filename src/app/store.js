import { configureStore } from '@reduxjs/toolkit'
import LanguageSlice from '../features/language/LanguageSlice'

export const store = configureStore({
    reducer: {
      language:LanguageSlice
  },
})

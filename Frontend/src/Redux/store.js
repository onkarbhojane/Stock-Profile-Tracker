import { configureStore } from '@reduxjs/toolkit'
// import CounterReducer from './slices/index.js'
import IsLogged  from './slices/Log';
export const store = configureStore({
  reducer: {
    IsLogged:IsLogged
  },
})

export default store;
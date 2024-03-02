import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slice/cardSlice';

export const store = configureStore({
  reducer: {
    cart: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

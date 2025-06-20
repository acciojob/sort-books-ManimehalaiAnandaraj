import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './reducer';

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

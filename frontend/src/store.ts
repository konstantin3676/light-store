import { configureStore } from '@reduxjs/toolkit';

import { api } from './api';
import { basketReducer } from './slices/basketSlice/basketSlice';
import { productReducer } from './slices/productSlice/productSlice';
import { userReducer } from './slices/userSlice/userSlice';

import type { AxiosInstance } from 'axios';
const extraArg: ThunkExtraArg = {
  api,
};

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    product: productReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: RootState;
}

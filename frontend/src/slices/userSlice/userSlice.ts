import { jwtDecode } from 'jwt-decode';

import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { User, UserSchema } from './types';
export const USER_LOCALSTORAGE_KEY = 'user';

const isTokenExpired = (token: string) => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    if (exp === undefined) return false;
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const initialState: UserSchema = {
  inited: false,
  authData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User | null>) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const userData = localStorage.getItem(USER_LOCALSTORAGE_KEY);

      if (userData) {
        try {
          const user = JSON.parse(userData) as User;
          if (isTokenExpired(user.access_token)) {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
          } else {
            state.authData = user;
          }
        } catch (e) {
          console.log(e);
        }
      }
      state.inited = true;
    },
    logout: (state) => {
      state.authData = null;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;

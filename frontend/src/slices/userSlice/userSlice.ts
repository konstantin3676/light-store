import { jwtDecode } from 'jwt-decode';

import { createSlice } from '@reduxjs/toolkit';

import { login } from './services/login';

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
  authDataLoading: false,
  authDataError: null,
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
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.authDataError = null;
      state.authDataLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.authDataLoading = false;
      const authData = action.payload;
      state.authData = authData;
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(authData));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.authDataLoading = false;
      state.authDataError = action.payload ?? null;
    });
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;

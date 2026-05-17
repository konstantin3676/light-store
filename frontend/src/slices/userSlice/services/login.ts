import { AxiosError } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import type { User } from '../types';
import type { ThunkConfig } from '../../../store';
type Props = {
  email: string;
  password: string;
};

export const login = createAsyncThunk<User, Props, ThunkConfig<string>>(
  'user/login',
  async ({ email, password }, { rejectWithValue, extra }) => {
    try {
      const { data } = await extra.api.post<User>(`/admin/signin/`, {
        email,
        password,
      });

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (e) {
      return rejectWithValue(
        e instanceof AxiosError && e.response?.data?.message
          ? e.response.data.message
          : 'Unknown error',
      );
    }
  },
);

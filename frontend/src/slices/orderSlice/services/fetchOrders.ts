import { AxiosError } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '../../../store';
import type { Order } from '../types';

export const fetchOrders = createAsyncThunk<
  Order[] | undefined,
  undefined,
  ThunkConfig<string>
>('order/fetchOrders', async (_, { rejectWithValue, extra, getState }) => {
  const authData = getState().user.authData;

  try {
    if (authData?.access_token) {
      const { data } = await extra.api.get<Order[]>(`/orders/`, {
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
        },
      });

      if (!data) {
        throw new Error();
      }

      return data;
    }
  } catch (e) {
    const message =
      e instanceof AxiosError && e.response?.data?.detail?.[0]?.msg
        ? e.response.data.detail[0].msg
        : 'Unknown error';

    return rejectWithValue(message);
  }
});

import { AxiosError } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import type { Product } from '../types';
import type { ThunkConfig } from '../../../store';
export const fetchProduct = createAsyncThunk<
  Product,
  number,
  ThunkConfig<string>
>('product/fetchProduct', async (product_id, { rejectWithValue, extra }) => {
  try {
    const { data } = await extra.api.get<Product>(`/products/${product_id}/`);

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
});

import { AxiosError } from 'axios';

import { notifications } from '@mantine/notifications';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '../../../store';
export const deleteProduct = createAsyncThunk<
  undefined,
  number,
  ThunkConfig<string>
>(
  'product/deleteProduct',
  async (product_id, { rejectWithValue, extra, getState }) => {
    const authData = getState().user.authData;

    try {
      if (authData?.access_token) {
        await extra.api.delete(`/products/${product_id}/`, {
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
          },
        });

        notifications.show({
          title: 'Удаление',
          message: 'Товар успешно удален',
        });
      }
    } catch (e) {
      const message =
        e instanceof AxiosError && e.response?.data?.detail?.[0]?.msg
          ? e.response.data.detail[0].msg
          : 'Unknown error';

      notifications.show({
        message,
        title: 'Удаление',
        color: 'pink',
      });

      return rejectWithValue(message);
    }
  },
);

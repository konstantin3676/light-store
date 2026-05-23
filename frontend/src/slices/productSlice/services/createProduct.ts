import { AxiosError } from 'axios';

import { notifications } from '@mantine/notifications';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '../../../store';
import type { Product } from '../types';
type Props = {
  productData: Omit<Product, 'id'>;
};

export const createProduct = createAsyncThunk<
  Product | undefined,
  Props,
  ThunkConfig<string>
>(
  'product/createProduct',
  async ({ productData }, { rejectWithValue, extra, getState }) => {
    const authData = getState().user.authData;
    const { name, desc, price, sku, stock } = productData;

    try {
      if (authData?.access_token) {
        const { data } = await extra.api.post<Product>(
          `/products/`,
          { name, desc, price, sku, stock },
          {
            headers: {
              Authorization: `Bearer ${authData.access_token}`,
            },
          },
        );

        if (!data) {
          throw new Error();
        }

        notifications.show({
          title: 'Создание',
          message: 'Товар успешно создан',
        });

        return data;
      }
    } catch (e) {
      const message =
        e instanceof AxiosError && e.response?.data?.detail?.[0]?.msg
          ? e.response.data.detail[0].msg
          : 'Unknown error';

      notifications.show({
        message,
        title: 'Создание',
        color: 'pink',
      });

      return rejectWithValue(message);
    }
  },
);

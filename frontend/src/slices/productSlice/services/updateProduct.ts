import { AxiosError } from 'axios';

import { notifications } from '@mantine/notifications';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '../../../store';
import type { Product } from '../types';
type Props = {
  productId: number;
  productData: Partial<Product>;
};

export const updateProduct = createAsyncThunk<
  Product | undefined,
  Props,
  ThunkConfig<string>
>(
  'product/updateProduct',
  async ({ productId, productData }, { rejectWithValue, extra, getState }) => {
    const authData = getState().user.authData;
    const { name, desc, price, sku, stock } = productData;

    try {
      if (authData?.access_token) {
        const { data } = await extra.api.put<Product>(
          `/products/${productId}/`,
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
          title: 'Сохранение',
          message: 'Товар успешно сохранен',
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
        title: 'Сохранение',
        color: 'pink',
      });

      return rejectWithValue(message);
    }
  },
);

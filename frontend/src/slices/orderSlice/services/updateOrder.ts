import { AxiosError } from 'axios';

import { notifications } from '@mantine/notifications';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '../../../store';
import type { Order } from '../types';
type Props = {
  orderId: number;
  orderData: Partial<Order>;
};

export const updateOrder = createAsyncThunk<
  Order | undefined,
  Props,
  ThunkConfig<string>
>(
  'order/updateOrder',
  async ({ orderId, orderData }, { rejectWithValue, extra, getState }) => {
    const authData = getState().user.authData;
    const { address, status } = orderData;

    try {
      if (authData?.access_token) {
        const { data } = await extra.api.put<Order>(
          `/orders/${orderId}/`,
          { address, status },
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
          message: 'Заказ успешно сохранен',
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

import { AxiosError } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '../../../store';
import type { CreateOrderResponse } from '../types';

type Props = {
  address: string;
};

export const createOrder = createAsyncThunk<
  CreateOrderResponse,
  Props,
  ThunkConfig<string>
>(
  'basket/createOrder',
  async ({ address }, { getState, rejectWithValue, extra }) => {
    const state = getState();
    const orderItems = state.basket.orderItems;

    try {
      const { data } = await extra.api.post<CreateOrderResponse>(`/orders/`, {
        address,
        order_items: orderItems.map(
          ({ productId, quantity, priceAtPurchase }) => ({
            quantity,
            product_id: productId,
            price_at_purchase: String(priceAtPurchase),
          }),
        ),
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

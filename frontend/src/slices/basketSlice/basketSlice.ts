import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { BasketSchema } from './types';

const initialState: BasketSchema = {
  orderItems: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setOrderItems: (
      state,
      { payload }: PayloadAction<BasketSchema['orderItems']>,
    ) => {
      state.orderItems = payload;
    },
    changeOrderItemQuantity: (
      state,
      { payload }: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      const orderItem = state.orderItems.find(
        ({ productId }) => productId === payload.productId,
      );
      if (orderItem) {
        orderItem.quantity = payload.quantity;
        orderItem.priceAtPurchase = orderItem.price * orderItem.quantity;
      }
    },
  },
});

export const { actions: basketActions, reducer: basketReducer } = basketSlice;

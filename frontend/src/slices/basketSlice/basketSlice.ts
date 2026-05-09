import { createSlice } from '@reduxjs/toolkit';

import { createOrder } from './services/createOrder';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { BasketSchema } from './types';
const initialState: BasketSchema = {
  orderItems: [],
  order: null,
  orderLoading: false,
  orderError: null,
  shouldShowSuccessAlert: false,
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
        orderItem.priceAtPurchase =
          Math.round(orderItem.price * orderItem.quantity * 100) / 100;
      }
    },
    setShouldShowSuccessAlert: (state, { payload }: PayloadAction<boolean>) => {
      state.shouldShowSuccessAlert = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.orderError = null;
      state.orderLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orderLoading = false;
      state.order = action.payload;
      state.shouldShowSuccessAlert = true;
      state.orderItems = [];
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.orderLoading = false;
      state.orderError = action.payload ?? null;
    });
  },
});

export const { actions: basketActions, reducer: basketReducer } = basketSlice;

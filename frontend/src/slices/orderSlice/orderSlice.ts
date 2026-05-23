import { createSlice } from '@reduxjs/toolkit';

import { fetchOrders } from './services/fetchOrders';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { OrderSchema } from './types';
const initialState: OrderSchema = {
  orders: [],
  ordersLoading: false,
  ordersError: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, { payload }: PayloadAction<OrderSchema['orders']>) => {
      state.orders = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.ordersError = null;
      state.ordersLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.ordersLoading = false;
      state.orders = action.payload ?? [];
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.ordersLoading = false;
      state.ordersError = action.payload ?? null;
    });
  },
});

export const { actions: orderActions, reducer: orderReducer } = orderSlice;

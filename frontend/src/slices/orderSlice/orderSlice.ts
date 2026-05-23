import { createSlice } from '@reduxjs/toolkit';

import { fetchOrders } from './services/fetchOrders';
import { updateOrder } from './services/updateOrder';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { OrderSchema } from './types';
const initialState: OrderSchema = {
  orders: [],
  ordersLoading: false,
  ordersError: null,
  order: null,
  orderLoading: false,
  orderError: null,
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
    builder.addCase(updateOrder.pending, (state) => {
      state.orderError = null;
      state.orderLoading = true;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.orderLoading = false;
      state.order = action.payload ?? null;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.orderLoading = false;
      state.orderError = action.payload ?? null;
    });
  },
});

export const { actions: orderActions, reducer: orderReducer } = orderSlice;

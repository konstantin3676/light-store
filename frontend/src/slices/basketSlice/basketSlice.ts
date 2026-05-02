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
  },
});

export const { actions: basketActions, reducer: basketReducer } = basketSlice;

import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export const getBasketOrderItems = (state: RootState) =>
  state.basket.orderItems;

export const getBasketOrderAmount = createSelector(
  [getBasketOrderItems],
  (orderItems) => {
    return orderItems.reduce((acc, item) => {
      return acc + item.priceAtPurchase;
    }, 0);
  },
);

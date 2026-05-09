import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export const getBasketOrderItems = (state: RootState) =>
  state.basket.orderItems;
export const getBasketOrderLoading = (state: RootState) =>
  state.basket.orderLoading;
export const getBasketShouldShowSuccessAlert = (state: RootState) =>
  state.basket.shouldShowSuccessAlert;

export const getBasketOrderAmount = createSelector(
  [getBasketOrderItems],
  (orderItems) => {
    return orderItems.reduce((acc, item) => {
      return acc + item.priceAtPurchase;
    }, 0);
  },
);

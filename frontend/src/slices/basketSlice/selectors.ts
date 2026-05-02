import type { RootState } from '../../store';

export const getBasketOrderItems = (state: RootState) =>
  state.basket.orderItems;

import type { RootState } from '../../store';

export const getOrders = (state: RootState) => state.order.orders;

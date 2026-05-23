import type { OrderStatus } from '../basketSlice/types';

export type Order = {
  id: number;
  address: string;
  status: OrderStatus;
};

export type OrderSchema = {
  orders: Order[];
  ordersLoading: boolean;
  ordersError: string | null;
  order: Order | null;
  orderLoading: boolean;
  orderError: string | null;
};

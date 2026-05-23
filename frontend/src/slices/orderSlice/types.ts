import type { OrderStatus } from '../basketSlice/types';

export type OrderItem = {
  id: string;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: string;
};

export type Order = {
  id: number;
  address: string;
  status: OrderStatus;
  order_items: OrderItem[];
};

export type OrderSchema = {
  orders: Order[];
  ordersLoading: boolean;
  ordersError: string | null;
  order: Order | null;
  orderLoading: boolean;
  orderError: string | null;
};

export type OrderStatus =
  | 'CREATED'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

export type Order = {
  id: number;
  address: string;
  status: OrderStatus;
};

export type OrderSchema = {
  orders: Order[];
  ordersLoading: boolean;
  ordersError: string | null;
};

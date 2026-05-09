export type OrderItem = {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  priceAtPurchase: number;
};

export type OrderStatus =
  | 'CREATED'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

export type OrderItemResponse = {
  id: string;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: string;
};

export type CreateOrderResponse = {
  id: string;
  address: string;
  status: OrderStatus;
  order_items: OrderItemResponse[];
};

export type BasketSchema = {
  orderItems: OrderItem[];
  order: CreateOrderResponse | null;
  orderLoading: boolean;
  orderError: string | null;
  shouldShowSuccessAlert: boolean;
};

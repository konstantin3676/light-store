export type OrderItem = {
  product_id: number;
  quantity: number;
  price_at_purchase: number;
};

export type BasketSchema = {
  orderItems: OrderItem[];
};

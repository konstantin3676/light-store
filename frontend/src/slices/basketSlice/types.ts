export type OrderItem = {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  priceAtPurchase: number;
};

export type BasketSchema = {
  orderItems: OrderItem[];
};

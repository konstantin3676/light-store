export type Product = {
  id: number;
  name: string;
  price: string;
  sku: string;
  stock: number;
  desc?: string;
};

export type ProductSchema = {
  product: Product | null;
  productLoading: boolean;
  productError: string | null;
  products: Product[];
  productsLoading: boolean;
  productsError: string | null;
};

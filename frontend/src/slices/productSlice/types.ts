export type Product = {
  id: number;
  name: string;
  desc: string;
  price: number;
  sku: string;
  stock: number;
};

export type ProductSchema = {
  product: Product | null;
  productLoading: boolean;
  productError: string | null;
  products: Product[];
  productsLoading: boolean;
  productsError: string | null;
};

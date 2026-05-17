import type { RootState } from '../../store';

export const getProduct = (state: RootState) => state.product.product;
export const getProducts = (state: RootState) => state.product.products;
export const getProductLoading = (state: RootState) =>
  state.product.productLoading;

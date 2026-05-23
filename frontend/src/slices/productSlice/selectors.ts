import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import type { Product } from './types';

export const getProduct = (state: RootState) => state.product.product;
export const getProducts = (state: RootState) => state.product.products;
export const getProductLoading = (state: RootState) =>
  state.product.productLoading;

export const getProductById = createSelector([getProducts], (products) => {
  return products.reduce<Record<Product['id'], Product>>(
    (acc, product) => ({
      ...acc,
      [product.id]: product,
    }),
    {},
  );
});

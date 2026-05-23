import { createSlice } from '@reduxjs/toolkit';

import { deleteProduct } from './services/deleteProduct';
import { fetchProduct } from './services/fetchProduct';
import { fetchProducts } from './services/fetchProducts';
import { updateProduct } from './services/updateProduct';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { ProductSchema } from './types';
const initialState: ProductSchema = {
  product: null,
  productLoading: false,
  productError: null,
  products: [],
  productsLoading: false,
  productsError: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (
      state,
      { payload }: PayloadAction<ProductSchema['product'] | null>,
    ) => {
      state.product = payload;
    },
    setProducts: (
      state,
      { payload }: PayloadAction<ProductSchema['products']>,
    ) => {
      state.products = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.productsError = null;
      state.productsLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productsLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.productsLoading = false;
      state.productsError = action.payload ?? null;
    });
    builder.addCase(fetchProduct.pending, (state) => {
      state.productError = null;
      state.productLoading = true;
      state.product = null;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.productLoading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.productLoading = false;
      state.productError = action.payload ?? null;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.productError = null;
      state.productLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.productLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.productLoading = false;
      state.productError = action.payload ?? null;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.productError = null;
      state.productLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.productLoading = false;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.productLoading = false;
      state.productError = action.payload ?? null;
    });
  },
});

export const { actions: productActions, reducer: productReducer } =
  productSlice;

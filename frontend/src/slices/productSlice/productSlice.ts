import { createSlice } from '@reduxjs/toolkit';

import { fetchProducts } from './services/fetchProducts';

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
      { payload }: PayloadAction<ProductSchema['product']>,
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
  },
});

export const { actions: productActions, reducer: productReducer } =
  productSlice;

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hook';
import { getProducts } from '../../slices/productSlice/selectors';
import { fetchProducts } from '../../slices/productSlice/services/fetchProducts';
import { ProductItem } from '../ProductItem/ProductItem';
import classes from './ProductItemList.module.css';

export const ProductItemList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      {products.map(({ id, name }) => (
        <ProductItem key={id} id={id} name={name} />
      ))}
    </div>
  );
};

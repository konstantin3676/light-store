import { useEffect } from 'react';

import { Image } from '@mantine/core';

import heroImgUrl from '../../assets/hero.jpg';
import { ProductList } from '../../components/ProductList/ProductList';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getProducts } from '../../slices/productSlice/selectors';
import { fetchProducts } from '../../slices/productSlice/services/fetchProducts';
import classes from './MainPage.module.css';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Image src={heroImgUrl} height={300} alt="Hero" bdrs="md" />
        <ProductList products={products} />
      </div>
    </div>
  );
};

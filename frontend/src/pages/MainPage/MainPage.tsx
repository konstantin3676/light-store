import { Image } from '@mantine/core';

import heroImgUrl from '../../assets/hero.jpg';
import { ProductList } from '../../components/ProductList/ProductList';
import { products } from '../../fixtures';
import classes from './MainPage.module.css';

export const MainPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Image src={heroImgUrl} height={300} alt="Hero" bdrs="md" />
        <ProductList products={products} />
      </div>
    </div>
  );
};

import { ProductList } from '../../components/ProductList/ProductList';
import { products } from '../../fixtures';
import classes from './MainPage.module.css';

export const MainPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <ProductList products={products} />
      </div>
    </div>
  );
};

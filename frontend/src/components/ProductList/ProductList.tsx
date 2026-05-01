import type { Product } from '../../types';
import { ProductCard } from '../ProductCard/ProductCard';
import classes from './ProductList.module.css';

type Props = {
  products: Product[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <div className={classes.container}>
      {products.map(({ id, name, desc, price }) => (
        <ProductCard key={id} id={id} name={name} desc={desc} price={price} />
      ))}
    </div>
  );
};

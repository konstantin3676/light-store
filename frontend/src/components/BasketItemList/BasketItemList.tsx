import { useAppSelector } from '../../hook';
import { getBasketOrderItems } from '../../slices/basketSlice/selectors';
import { BasketItem } from '../BasketItem/BasketItem';
import classes from './BasketItemList.module.css';

export const BasketItemList = () => {
  const orderItems = useAppSelector(getBasketOrderItems);

  return (
    <div className={classes.container}>
      {orderItems.map(({ productId, name, quantity, priceAtPurchase }) => (
        <BasketItem
          key={productId}
          id={productId}
          name={name}
          quantity={quantity}
          priceAtPurchase={priceAtPurchase}
        />
      ))}
    </div>
  );
};

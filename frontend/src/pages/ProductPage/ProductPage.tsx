import { useParams } from 'react-router';

import { Badge, Button, Image } from '@mantine/core';

import lampImgUrl from '../../assets/lamp.jpg';
import { products } from '../../fixtures';
import { useAppDispatch, useAppSelector } from '../../hook';
import { basketActions } from '../../slices/basketSlice/basketSlice';
import { getBasketOrderItems } from '../../slices/basketSlice/selectors';
import classes from './ProductPage.module.css';

export const ProductPage = () => {
  const { pid } = useParams();
  const productId = Number(pid);
  const dispatch = useAppDispatch();
  const product = products.find(({ id }) => id === productId);
  const orderItems = useAppSelector(getBasketOrderItems);
  const hasAtBasket = orderItems.some((item) => item.productId === productId);

  if (!product) return null;

  const handleAddBasket = () => {
    let newOrderItems;
    if (hasAtBasket) {
      newOrderItems = orderItems.filter((item) => item.productId !== productId);
    } else {
      newOrderItems = [
        ...orderItems,
        {
          productId,
          name: product.name,
          quantity: 1,
          price: Number.parseFloat(product.price),
          priceAtPurchase: Number.parseFloat(product.price),
        },
      ];
    }
    dispatch(basketActions.setOrderItems(newOrderItems));
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Image src={lampImgUrl} height={350} alt="Lamp" />
        <div className={classes.nameWrapper}>
          <div>{product.name}</div>
          <Badge color="pink" size="lg">{`${product.price} руб`}</Badge>
        </div>
        <div>{product.desc}</div>
        <div className={classes.buttonWrapper}>
          <div className={classes.button}>
            <Button color="blue" fullWidth mt="md" onClick={handleAddBasket}>
              {hasAtBasket ? 'Убрать из корзины' : 'Купить'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

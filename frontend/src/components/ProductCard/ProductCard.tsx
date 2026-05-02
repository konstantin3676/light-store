import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';

import lampImgUrl from '../../assets/lamp.jpg';
import { useAppDispatch, useAppSelector } from '../../hook';
import { basketActions } from '../../slices/basketSlice/basketSlice';
import { getBasketOrderItems } from '../../slices/basketSlice/selectors';
import classes from './ProductCard.module.css';

import type { Product } from '../../types';
type Props = {
  id: Product['id'];
  name: Product['name'];
  desc: Product['desc'];
  price: Product['price'];
};

export const ProductCard = ({ id, name, desc, price }: Props) => {
  const dispatch = useAppDispatch();
  const orderItems = useAppSelector(getBasketOrderItems);
  const hasAtBasket = orderItems.some(({ productId }) => productId === id);

  const handleAddBasket = () => {
    let newOrderItems;
    if (hasAtBasket) {
      newOrderItems = orderItems.filter(({ productId }) => productId !== id);
    } else {
      newOrderItems = [
        ...orderItems,
        {
          productId: id,
          name,
          quantity: 1,
          price: Number.parseFloat(price),
          priceAtPurchase: Number.parseFloat(price),
        },
      ];
    }
    dispatch(basketActions.setOrderItems(newOrderItems));
  };

  return (
    <Card shadow="sm" padding="lg" withBorder className={classes.card}>
      <Card.Section>
        <Image src={lampImgUrl} height={160} alt="Lamp" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{name}</Text>
        <Badge color="pink">{`${price} руб`}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {desc}
      </Text>

      <Button color="blue" fullWidth mt="md" onClick={handleAddBasket}>
        {hasAtBasket ? 'Убрать из корзины' : 'Купить'}
      </Button>
    </Card>
  );
};

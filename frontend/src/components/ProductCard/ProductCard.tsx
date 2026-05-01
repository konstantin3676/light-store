import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';

import foodImgUrl from '../../assets/food.jpeg';
import classes from './ProductCard.module.css';

import type { Product } from '../../types';
type Props = {
  id: Product['id'];
  name: Product['name'];
  desc: Product['desc'];
  price: Product['price'];
};

export const ProductCard = ({ name, desc, price }: Props) => {
  return (
    <Card shadow="sm" padding="lg" withBorder className={classes.card}>
      <Card.Section>
        <Image src={foodImgUrl} height={160} alt="Fried egg" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{name}</Text>
        <Badge color="pink">{`${price} руб`}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {desc}
      </Text>

      <Button color="blue" fullWidth mt="md">
        Купить
      </Button>
    </Card>
  );
};

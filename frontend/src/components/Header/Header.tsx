import { Link } from 'react-router';

import { Anchor } from '@mantine/core';

import { BasketButton } from '../BasketButton/BasketButton';
import classes from './Header.module.css';

export const Header = () => {
  return (
    <header className={classes.header}>
      <Anchor
        component={Link}
        to="/"
        underline="never"
        className={classes.title}
      >
        Магазин лампочек
      </Anchor>
      <BasketButton />
    </header>
  );
};

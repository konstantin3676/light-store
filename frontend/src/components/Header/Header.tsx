import { BasketButton } from '../BasketButton/BasketButton';
import classes from './Header.module.css';

export const Header = () => {
  return (
    <header className={classes.header}>
      <BasketButton />
    </header>
  );
};

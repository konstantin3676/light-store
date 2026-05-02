import { BasketItemList } from '../../components/BasketItemList/BasketItemList';
import classes from './BasketPage.module.css';

export const BasketPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <BasketItemList />
      </div>
    </div>
  );
};

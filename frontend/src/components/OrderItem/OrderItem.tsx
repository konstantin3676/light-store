import classes from './OrderItem.module.css';

import type { Order } from '../../slices/orderSlice/types';

type Props = {
  id: Order['id'];
  address: Order['address'];
  status: Order['status'];
};

export const OrderItem = ({ address, status }: Props) => {
  return (
    <div className={classes.container}>
      <div className={classes.address}>{address}</div>
      <div>{status}</div>
    </div>
  );
};

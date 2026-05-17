import { AdminContent } from '../../components/AdminContent/AdminContent';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { useAppSelector } from '../../hook';
import {
  getUserAuthData,
  getUserInited,
} from '../../slices/userSlice/selectors';
import classes from './AdminPage.module.css';

export const AdminPage = () => {
  const authData = useAppSelector(getUserAuthData);
  const inited = useAppSelector(getUserInited);

  if (!inited) return null;

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {authData?.access_token ? <AdminContent /> : <LoginForm />}
      </div>
    </div>
  );
};

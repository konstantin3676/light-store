import { Button, Group, Paper, PasswordInput, TextInput } from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';

import { useAppDispatch } from '../../hook';
import { login } from '../../slices/userSlice/services/login';
import classes from './LoginForm.module.css';

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail(),
      password: isNotEmpty(),
    },
  });

  return (
    <div className={classes.container}>
      <Paper shadow="xs" p="md" w={400}>
        <form
          onSubmit={form.onSubmit((values) => {
            dispatch(login(values));
          })}
        >
          <TextInput
            withAsterisk
            label="Email"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            withAsterisk
            label="Пароль"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />

          <Group mt="md">
            <Button fullWidth type="submit">
              Войти
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
};

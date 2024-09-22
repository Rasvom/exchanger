import { Box, Button } from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@chakra-ui/react';

const Authorization = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Обработайте данные формы здесь
  };

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Box maxWidth={'sm'}>
        <Box>Вход в систему</Box>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name='email'
            control={control}
            rules={{
              required: 'Email обязателен',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Введите корректный email',
              },
            }}
            render={({ field }) => (
              <Input
                variant='outlined'
                margin='normal'
                required
                id='email'
                autoComplete='email'
                {...field}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            rules={{ required: 'Пароль обязателен' }}
            render={({ field }) => (
              <Input
                variant='outlined'
                margin='normal'
                required
                type='password'
                id='password'
                autoComplete='current-password'
                {...field}
              />
            )}
          />
          <Button type='submit'>Войти</Button>
        </form>
      </Box>
    </Box>
  );
};

export default Authorization;

import { Box, Button } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import InputField from '@components/InputField';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import useAuth from '@hooks/useAuth';
import useShowToastNotification from '@hooks/useShowToastNotification';

const Authorization = () => {
  const { login, infoLogin } = useAuth();

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: any) => {
    login(data);
  };

  useShowToastNotification(infoLogin, {
    isShowError: true,
    isShowSuccess: false,
    errorTitle: 'Что-то пошло не так =(',
  });
  return (
    <FormProvider {...methods}>
      <Box display={'flex'} justifyContent={'center'}>
        <Box maxWidth={'sm'}>
          <Box>Вход в систему</Box>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <InputField
              name='email'
              label='Эл. почта'
              placeholder='Эл. почта'
              required={true}
              Icon={AtSignIcon}
            />
            <InputField
              name='password'
              label='Пароль'
              placeholder='Пароль'
              required={true}
              Icon={LockIcon}
              type='password'
            />
            <Button type='submit' isLoading={infoLogin?.isLoading} bg={'#F0B90B'}>
              Войти
            </Button>
          </form>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default Authorization;

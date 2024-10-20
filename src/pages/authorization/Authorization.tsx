import { Box, Button, Flex, Text } from '@chakra-ui/react';
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
      <Flex justifyContent={'center'}>
        <Box
          maxWidth={'sm'}
          border={'1px solid #2b3139'}
          borderRadius={'24px'}
          width={'425px'}
          minHeight={'580px'}
          p={'40px'}
        >
          <Text mb={'30px'} fontSize={'xl'}>
            Вход в систему
          </Text>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <Flex flexDirection={'column'} gap={'15px'}>
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
            </Flex>
          </form>
        </Box>
      </Flex>
    </FormProvider>
  );
};

export default Authorization;

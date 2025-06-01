import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import InputField from '@components/InputField';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { useLoginMutation } from '@store/slices/api/auth-service';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Authorization = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [login, { isLoading }] = useLoginMutation();

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values).unwrap();
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Ошибка входа',
        description: error.data?.error || 'Неверный email или пароль',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justifyContent='center' alignItems='center' minH='100vh' bg='#232334'>
      <Box
        maxWidth='lg'
        width='100%'
        border='1px solid #2b3139'
        borderRadius='24px'
        p='40px'
        bgColor='#1e1e2a'
      >
        <Text fontSize='2xl' mb={6} textAlign='center' color='white'>
          Вход в систему
        </Text>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Flex flexDirection={'column'} gap={'15px'}>
              <InputField
                name='email'
                label='Email'
                placeholder='Введите ваш email'
                required={true}
                Icon={AtSignIcon}
                color='white'
                _placeholder={{ color: '#aaa' }}
                pattern={{
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Неверный формат email адреса',
                }}
              />
              <InputField
                name='password'
                label='Пароль'
                placeholder='Введите ваш пароль'
                required={true}
                Icon={LockIcon}
                type='password'
                color='white'
                _placeholder={{ color: '#aaa' }}
              />
              <Button
                type='submit'
                bg='#F0B90B'
                color='black'
                isLoading={isLoading}
                _hover={{ bg: '#d9a30b' }}
              >
                Войти
              </Button>
              <Text color='white' textAlign='center'>
                Нет аккаунта?{' '}
                <Link to='/registration' style={{ color: '#F0B90B' }}>
                  Зарегистрироваться
                </Link>
              </Text>
            </Flex>
          </form>
        </FormProvider>
      </Box>
    </Flex>
  );
};

export default Authorization;

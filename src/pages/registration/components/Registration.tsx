import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import InputField from '@components/InputField';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import {
  useSendConfirmationCodeMutation,
  useVerifyConfirmationCodeMutation,
  useRegistrationMutation,
} from '@store/slices/api/auth-service';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Registration = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [sendCode, { isLoading: isSendingCode }] = useSendConfirmationCodeMutation();
  const [verifyCode, { isLoading: isVerifyingCode }] = useVerifyConfirmationCodeMutation();
  const [register, { isLoading: isRegistering }] = useRegistrationMutation();

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      code: '',
      fullName: '',
    },
  });

  const onSendCode = async () => {
    const email = methods.getValues('email');
    if (!email) {
      toast({
        title: 'Ошибка',
        description: 'Введите email',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await sendCode({ email }).unwrap();
      setIsCodeSent(true);
      toast({
        title: 'Код отправлен',
        description: 'Код подтверждения отправлен на указанный email',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Ошибка отправки кода',
        description: error.data?.error || 'Произошла ошибка при отправке кода',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onVerifyCode = async () => {
    const email = methods.getValues('email');
    const code = methods.getValues('code');

    if (!email || !code) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await verifyCode({ email, code }).unwrap();
      setIsVerified(true);
      toast({
        title: 'Код подтвержден',
        description: 'Теперь вы можете завершить регистрацию',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Ошибка подтверждения кода',
        description: error.data?.error || 'Неверный код подтверждения',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onSubmit = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Пароли не совпадают',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (values.password.length < 5) {
      toast({
        title: 'Ошибка',
        description: 'Пароль должен содержать минимум 5 символов',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await register({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
      }).unwrap();
      toast({
        title: 'Регистрация успешна',
        description: 'Теперь вы можете войти в систему',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/authorization');
    } catch (error: any) {
      toast({
        title: 'Ошибка регистрации',
        description: error.data?.error || 'Произошла ошибка при регистрации',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justifyContent='center' alignItems='center' minH='100vh'>
      <Box
        maxWidth='lg'
        width='100%'
        border='1px solid #2b3139'
        borderRadius='24px'
        p='40px'
        bgColor='#1e1e2a'
      >
        <Text fontSize='2xl' mb={6} textAlign='center' color='white'>
          Регистрация
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
              {!isCodeSent ? (
                <Button
                  onClick={onSendCode}
                  isLoading={isSendingCode}
                  bg='#F0B90B'
                  color='black'
                  _hover={{ bg: '#d9a30b' }}
                >
                  Отправить код подтверждения
                </Button>
              ) : !isVerified ? (
                <>
                  <InputField
                    name='code'
                    label='Код подтверждения'
                    placeholder='Введите код из email'
                    required={true}
                    color='white'
                    _placeholder={{ color: '#aaa' }}
                  />
                  <Button
                    onClick={onVerifyCode}
                    isLoading={isVerifyingCode}
                    bg='#F0B90B'
                    color='black'
                    _hover={{ bg: '#d9a30b' }}
                  >
                    Подтвердить код
                  </Button>
                </>
              ) : (
                <>
                  <InputField
                    name='fullName'
                    label='ФИО'
                    placeholder='Введите ваше ФИО'
                    required={true}
                    color='white'
                    _placeholder={{ color: '#aaa' }}
                  />
                  <InputField
                    name='password'
                    label='Пароль'
                    placeholder='Введите пароль'
                    required={true}
                    Icon={LockIcon}
                    type='password'
                    color='white'
                    _placeholder={{ color: '#aaa' }}
                  />
                  <InputField
                    name='confirmPassword'
                    label='Подтвердите пароль'
                    placeholder='Подтвердите пароль'
                    required={true}
                    Icon={LockIcon}
                    type='password'
                    color='white'
                    _placeholder={{ color: '#aaa' }}
                  />
                  <Button
                    type='submit'
                    isLoading={isRegistering}
                    bg='#F0B90B'
                    color='black'
                    _hover={{ bg: '#d9a30b' }}
                  >
                    Зарегистрироваться
                  </Button>
                </>
              )}
              <Text color='white' textAlign='center'>
                Уже есть аккаунт?{' '}
                <Link to='/authorization' style={{ color: '#F0B90B' }}>
                  Войти
                </Link>
              </Text>
            </Flex>
          </form>
        </FormProvider>
      </Box>
    </Flex>
  );
};

export default Registration;

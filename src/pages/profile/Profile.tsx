import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  HStack,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import InputField from '@components/InputField';
import { AtSignIcon, LockIcon, EditIcon } from '@chakra-ui/icons';
import PersonIcon from '@assets/icons/PersonIcon';
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useChangeEmailMutation,
} from '@store/slices/api/user-service';
import { useSendConfirmationCodeMutation } from '@store/slices/api/auth-service';
import { useState, useEffect } from 'react';

interface ProfileFormData {
  fullName: string;
}

interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface EmailFormData {
  newEmail: string;
  code: string;
}

const Profile = () => {
  const toast = useToast();
  const { data: userProfile, isLoading: isLoadingProfile } = useGetUserProfileQuery({});

  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [changeEmail, { isLoading: isChangingEmail }] = useChangeEmailMutation();
  const [sendConfirmationCode, { isLoading: isSendingCode }] = useSendConfirmationCodeMutation();

  const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure();
  const {
    isOpen: isOpenPassword,
    onOpen: onOpenPassword,
    onClose: onClosePassword,
  } = useDisclosure();
  const { isOpen: isOpenEmail, onOpen: onOpenEmail, onClose: onCloseEmail } = useDisclosure();

  const [isCodeSent, setIsCodeSent] = useState(false);

  const profileMethods = useForm<ProfileFormData>({
    defaultValues: {
      fullName: '',
    },
  });

  const passwordMethods = useForm<PasswordFormData>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const emailMethods = useForm<EmailFormData>({
    defaultValues: {
      newEmail: '',
      code: '',
    },
  });

  useEffect(() => {
    if (userProfile?.fullName) {
      profileMethods.setValue('fullName', userProfile.fullName);
    }
  }, [userProfile, profileMethods]);

  const onSubmitProfile = async (data: ProfileFormData) => {
    try {
      await updateProfile(data).unwrap();
      onCloseProfile();
      toast({
        title: 'Профиль обновлен',
        description: 'Ваши данные успешно обновлены',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Ошибка обновления профиля',
        description: error.data?.error || 'Произошла ошибка при обновлении профиля',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onSubmitPassword = async (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Новые пароли не совпадают',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (data.newPassword.length < 5) {
      toast({
        title: 'Ошибка',
        description: 'Новый пароль должен содержать минимум 5 символов',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();
      onClosePassword();
      passwordMethods.reset();
      toast({
        title: 'Пароль изменен',
        description: 'Ваш пароль успешно изменен',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Ошибка изменения пароля',
        description: error.data?.error || 'Произошла ошибка при изменении пароля',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onSendEmailCode = async () => {
    const newEmail = emailMethods.getValues('newEmail');
    if (!newEmail) {
      toast({
        title: 'Ошибка',
        description: 'Введите новый email',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await sendConfirmationCode({ email: newEmail }).unwrap();
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

  const onSubmitEmail = async (data: EmailFormData) => {
    if (!data.newEmail || !data.code) {
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
      await changeEmail(data).unwrap();
      onCloseEmail();
      setIsCodeSent(false);
      emailMethods.reset();
      toast({
        title: 'Email изменен',
        description: 'Ваш email успешно изменен',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Ошибка изменения email',
        description: error.data?.error || 'Произошла ошибка при изменении email',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoadingProfile) {
    return (
      <Flex
        justifyContent='center'
        alignItems='center'
        height='400px'
        bg='#232334'
        minH='100vh'
        p={4}
      >
        <Box
          maxWidth='lg'
          width='100%'
          border='1px solid #2b3139'
          borderRadius='24px'
          p='40px'
          bgColor='#1e1e2a'
          textAlign='center'
        >
          <Text color='white' fontSize='lg'>
            Загрузка профиля...
          </Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex justifyContent='center' p={4} minH='100vh'>
      <Box
        maxWidth='lg'
        width='100%'
        border='1px solid #2b3139'
        borderRadius='24px'
        p='40px'
        bgColor='#1e1e2a'
      >
        <Text fontSize='2xl' mb={6} textAlign='center' color='white'>
          Профиль пользователя
        </Text>

        <VStack spacing={6} align='stretch'>
          <Box>
            <Text fontSize='lg' mb={4} fontWeight='bold' color='white'>
              Основная информация
            </Text>
            <VStack spacing={3} align='stretch'>
              <HStack justify='space-between'>
                <Text color='white'>ФИО:</Text>
                <HStack>
                  <Text color='gray.300'>{userProfile?.fullName}</Text>
                  <Button
                    size='sm'
                    bg='#F0B90B'
                    color='black'
                    leftIcon={<EditIcon />}
                    onClick={onOpenProfile}
                    _hover={{ bg: '#d9a30b' }}
                  >
                    Изменить
                  </Button>
                </HStack>
              </HStack>
              <HStack justify='space-between'>
                <Text color='white'>Email:</Text>
                <HStack>
                  <Text color='gray.300'>{userProfile?.email}</Text>
                  <Button
                    size='sm'
                    bg='#F0B90B'
                    color='black'
                    leftIcon={<EditIcon />}
                    onClick={onOpenEmail}
                    _hover={{ bg: '#d9a30b' }}
                  >
                    Изменить
                  </Button>
                </HStack>
              </HStack>
            </VStack>
          </Box>

          <Divider borderColor='#2b3139' />

          {/* Безопасность */}
          <Box>
            <Text fontSize='lg' mb={4} fontWeight='bold' color='white'>
              Безопасность
            </Text>
            <Button
              leftIcon={<LockIcon />}
              onClick={onOpenPassword}
              bg='#F0B90B'
              color='black'
              width='fit-content'
              _hover={{ bg: '#d9a30b' }}
            >
              Изменить пароль
            </Button>
          </Box>
        </VStack>

        {/* Модальное окно редактирования профиля */}
        <Modal isOpen={isOpenProfile} onClose={onCloseProfile}>
          <ModalOverlay bg='rgba(0, 0, 0, 0.6)' />
          <ModalContent bgColor='#1e1e2a' border='1px solid #2b3139' color='white'>
            <ModalHeader color='white'>Редактировать ФИО</ModalHeader>
            <ModalCloseButton color='white' />
            <FormProvider {...profileMethods}>
              <form onSubmit={profileMethods.handleSubmit(onSubmitProfile)}>
                <ModalBody>
                  <Flex flexDirection={'column'} gap={'15px'}>
                    <InputField
                      name='fullName'
                      label='ФИО'
                      placeholder='Введите ваше ФИО'
                      required={true}
                      Icon={PersonIcon}
                      color='white'
                      _placeholder={{ color: '#aaa' }}
                    />
                  </Flex>
                </ModalBody>
                <ModalFooter bg='#1e1e2a'>
                  <Button variant='ghost' mr={3} onClick={onCloseProfile} color='white'>
                    Отмена
                  </Button>
                  <Button
                    type='submit'
                    bg='#F0B90B'
                    color='black'
                    isLoading={isUpdatingProfile}
                    _hover={{ bg: '#d9a30b' }}
                  >
                    Сохранить
                  </Button>
                </ModalFooter>
              </form>
            </FormProvider>
          </ModalContent>
        </Modal>

        {/* Модальное окно изменения пароля */}
        <Modal isOpen={isOpenPassword} onClose={onClosePassword}>
          <ModalOverlay bg='rgba(0, 0, 0, 0.6)' />
          <ModalContent bgColor='#1e1e2a' border='1px solid #2b3139' color='white'>
            <ModalHeader color='white'>Изменить пароль</ModalHeader>
            <ModalCloseButton color='white' />
            <FormProvider {...passwordMethods}>
              <form onSubmit={passwordMethods.handleSubmit(onSubmitPassword)}>
                <ModalBody>
                  <Flex flexDirection={'column'} gap={'15px'}>
                    <InputField
                      name='oldPassword'
                      label='Старый пароль'
                      placeholder='Введите старый пароль'
                      required={true}
                      Icon={LockIcon}
                      type='password'
                      color='white'
                      _placeholder={{ color: '#aaa' }}
                    />
                    <InputField
                      name='newPassword'
                      label='Новый пароль'
                      placeholder='Введите новый пароль'
                      required={true}
                      Icon={LockIcon}
                      type='password'
                      color='white'
                      _placeholder={{ color: '#aaa' }}
                    />
                    <InputField
                      name='confirmPassword'
                      label='Подтвердите новый пароль'
                      placeholder='Подтвердите новый пароль'
                      required={true}
                      Icon={LockIcon}
                      type='password'
                      color='white'
                      _placeholder={{ color: '#aaa' }}
                    />
                  </Flex>
                </ModalBody>
                <ModalFooter bg='#1e1e2a'>
                  <Button variant='ghost' mr={3} onClick={onClosePassword} color='white'>
                    Отмена
                  </Button>
                  <Button
                    type='submit'
                    bg='#F0B90B'
                    color='black'
                    isLoading={isChangingPassword}
                    _hover={{ bg: '#d9a30b' }}
                  >
                    Изменить пароль
                  </Button>
                </ModalFooter>
              </form>
            </FormProvider>
          </ModalContent>
        </Modal>

        {/* Модальное окно изменения email */}
        <Modal isOpen={isOpenEmail} onClose={onCloseEmail}>
          <ModalOverlay bg='rgba(0, 0, 0, 0.6)' />
          <ModalContent bgColor='#1e1e2a' border='1px solid #2b3139' color='white'>
            <ModalHeader color='white'>Изменить email</ModalHeader>
            <ModalCloseButton color='white' />
            <FormProvider {...emailMethods}>
              <ModalBody>
                <Flex flexDirection={'column'} gap={'15px'}>
                  <InputField
                    name='newEmail'
                    label='Новый email'
                    placeholder='Введите новый email'
                    required={true}
                    Icon={AtSignIcon}
                    type='email'
                    color='white'
                    _placeholder={{ color: '#aaa' }}
                  />
                  {!isCodeSent ? (
                    <Button
                      onClick={onSendEmailCode}
                      isLoading={isSendingCode}
                      bg='#F0B90B'
                      color='black'
                      width='100%'
                      _hover={{ bg: '#d9a30b' }}
                    >
                      Отправить код подтверждения
                    </Button>
                  ) : (
                    <>
                      <InputField
                        name='code'
                        label='Код подтверждения'
                        placeholder='Введите код из email'
                        required={true}
                        color='white'
                        _placeholder={{ color: '#aaa' }}
                      />
                      <form onSubmit={emailMethods.handleSubmit(onSubmitEmail)}>
                        <Button
                          type='submit'
                          bg='#F0B90B'
                          color='black'
                          isLoading={isChangingEmail}
                          width='100%'
                          _hover={{ bg: '#d9a30b' }}
                        >
                          Изменить email
                        </Button>
                      </form>
                    </>
                  )}
                </Flex>
              </ModalBody>
              <ModalFooter bg='#1e1e2a'>
                <Button
                  variant='ghost'
                  onClick={() => {
                    onCloseEmail();
                    setIsCodeSent(false);
                    emailMethods.reset();
                  }}
                  color='white'
                  width='100%'
                >
                  Отмена
                </Button>
              </ModalFooter>
            </FormProvider>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default Profile;

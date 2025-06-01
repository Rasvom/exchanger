import {
  Box,
  Spinner,
  Text,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useGetRequestByIdQuery } from '@store/slices/api/request-service';
import useShowToastNotification from '@hooks/useShowToastNotification';
import { useUploadFileMutation } from '@store/slices/api/file-service';
import FileUploader from '@components/FileUploader';
import { useForm, FormProvider } from 'react-hook-form';

const RequestView = () => {
  const { id } = useParams<{ id: string }>();
  const { data: request, isLoading, ...getReqeustInfo } = useGetRequestByIdQuery(id!);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [uploadFile] = useUploadFileMutation();
  const methods = useForm();
  const toast = useToast();

  useShowToastNotification(getReqeustInfo, {
    isShowSuccess: false,
    isShowError: true,
    errorTitle: 'Ошибка загрузки заявки',
    errorDefaultDescription: 'Попробуйте обновить страницу или проверьте правильность ID',
  });

  const onSubmit = async (data: any) => {
    try {
      await uploadFile({ file: data.file[0], cardNumber: request?.receiveAccountNumber }).unwrap();
      onClose();
      toast({
        title: 'Фото загружено',
        description: 'Фото карты успешно загружено и ожидает верификации.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить фото карты.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Box textAlign='center' mt={5}>
        <Spinner size='xl' />
      </Box>
    );
  }

  if (!request) {
    return (
      <Box textAlign='center' mt={5}>
        <Text fontSize='lg' color='red.500'>
          Заявка не найдена
        </Text>
      </Box>
    );
  }

  return (
    <Box p={6} borderWidth={1} borderRadius='lg' boxShadow='md' maxW='800px' mx='auto' my={8}>
      <VStack align='start' spacing={5}>
        <Text fontSize='2xl' fontWeight='bold' color='teal.600'>
          Заявка #{request._id}
        </Text>
        <Text fontSize='lg' fontWeight='semibold' color='gray.700'>
          <b>Статус:</b> {request.status}
        </Text>
        <Text fontSize='md' color='gray.600'>
          <b>Метод отправки:</b> {request.sendMethod?.name}
        </Text>
        <Text fontSize='md' color='gray.600'>
          <b>Сумма отправки:</b> {request.sendAmount}
        </Text>
        <Text fontSize='md' color='gray.600'>
          <b>Метод получения:</b> {request.receiveMethod?.name}
        </Text>
        <Text fontSize='md' color='gray.600'>
          <b>Сумма получения:</b> {request.receiveAmount}
        </Text>
        <Text fontSize='md' color='gray.600'>
          <b>Email:</b> {request.email}
        </Text>
        <Text fontSize='md' color='gray.600'>
          <b>Телефон:</b> {request.phoneNumber ?? '-'}
        </Text>
        <Text fontSize='md' color='gray.600'>
          <b>Номер карты:</b> {request.receiveAccountNumber ?? '-'}
        </Text>
        <Text fontSize='md' color='gray.600'>
          <b>Получатель:</b> {request.recipientName ?? '-'}
        </Text>
        <Text fontSize='md' color='gray.600'>
          <b>Telegram:</b> {request.telegramLink ?? '-'}
        </Text>
        <Text fontSize='sm' color='gray.500' mt={2}>
          <b>Создано:</b> {new Date(request.createdAt).toLocaleString()}
        </Text>
        {request.status === 'PENDING_VERIFICATION' && (
          <Button
            onClick={onOpen}
            colorScheme='teal'
            size='md'
            _hover={{ transform: 'scale(1.05)' }}
            transition='all 0.2s'
          >
            Загрузить фото карты
          </Button>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Загрузка фото карты</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormProvider {...(methods as any)}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FileUploader name='file' required label='Выберите файл' />
                <Button type='submit' mt={4} colorScheme='teal'>
                  Загрузить
                </Button>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RequestView;

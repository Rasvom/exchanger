import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Badge,
  Button,
  Grid,
  Alert,
  AlertIcon,
  Skeleton,
  Flex,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon, AddIcon, ViewIcon } from '@chakra-ui/icons';
import { useForm, FormProvider } from 'react-hook-form';
import {
  useGetUserVerifiedFilesQuery,
  useUploadFileMutation,
  VerifiedFile,
} from '@store/slices/api/file-service';
import FileUploader from '@components/FileUploader';

interface UploadFormData {
  cardNumber: string;
  file: FileList;
}

const WalletVerification = () => {
  const toast = useToast();
  const { data: verifiedFiles, isLoading, error } = useGetUserVerifiedFilesQuery();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Форма для загрузки файла
  const methods = useForm<UploadFormData>({
    defaultValues: {
      cardNumber: '',
      file: undefined,
    },
  });

  // Используем тот же стиль что и на других страницах
  const cardStyle = {
    bgColor: '#232334',
    boxShadow: '0 2px 24px rgba(24,32,82,.05)',
    borderRadius: '16px',
    border: 'none',
  };

  // Функция форматирования даты
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Функция получения цвета бейджа статуса верификации
  const getVerificationColor = (isVerified: boolean) => {
    return isVerified ? 'green' : 'orange';
  };

  // Функция получения текста статуса верификации
  const getVerificationLabel = (isVerified: boolean) => {
    return isVerified ? 'Верифицирован' : 'На проверке';
  };

  // Обработчик загрузки файла
  const handleUpload = async (data: UploadFormData) => {
    if (!data.file || data.file.length === 0) {
      toast({
        title: 'Ошибка',
        description: 'Выберите файл для загрузки',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Очищаем номер карты от пробелов
    const cleanCardNumber = data.cardNumber.replace(/\s/g, '');

    // Проверяем формат номера карты (16 цифр)
    if (!/^\d{16}$/.test(cleanCardNumber)) {
      toast({
        title: 'Ошибка',
        description: 'Номер карты должен содержать 16 цифр',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await uploadFile({
        file: data.file[0],
        cardNumber: cleanCardNumber,
      }).unwrap();

      toast({
        title: 'Файл загружен',
        description: 'Документ отправлен на проверку',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Закрываем модал и сбрасываем форму
      onClose();
      methods.reset();
    } catch (error) {
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить файл',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Обработчик изменения номера карты с форматированием
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Оставляем только цифры
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Добавляем пробелы каждые 4 цифры
    if (value.length <= 16) {
      methods.setValue('cardNumber', formatted);
    }
  };

  const handleCloseModal = () => {
    onClose();
    methods.reset();
  };

  if (error) {
    return (
      <Box p={4} bg='#232334' minH='100vh'>
        <Alert status='error' bg='#2a2a3e' borderColor='red.500' border='1px solid'>
          <AlertIcon color='red.400' />
          <Text color='white'>Ошибка загрузки данных о верификации</Text>
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={4} bg='#232334' minH='100vh'>
      <VStack spacing={6} align='stretch'>
        {/* Заголовок */}
        <Flex justify='space-between' align='center'>
          <Text fontSize='2xl' fontWeight='bold' color='white'>
            Верификация счетов
          </Text>
          <Button
            leftIcon={<AddIcon />}
            bg='#F0B90B'
            color='black'
            onClick={onOpen}
            _hover={{ bg: '#d9a30b' }}
          >
            Добавить счет
          </Button>
        </Flex>

        {/* Описание */}
        <Card {...cardStyle}>
          <CardBody>
            <VStack align='start' spacing={3}>
              <Text fontSize='lg' fontWeight='semibold' color='white'>
                Информация о верификации
              </Text>
              <Text color='gray.300'>
                Для ускорения обработки заявок рекомендуется предварительно верифицировать свои
                банковские счета. Загрузите фото банковской карты для подтверждения владения счетом.
              </Text>
              <HStack>
                <CheckCircleIcon color='green.400' />
                <Text color='gray.300'>Верифицированные счета обрабатываются автоматически</Text>
              </HStack>
              <HStack>
                <WarningIcon color='orange.400' />
                <Text color='gray.300'>Неверифицированные счета требуют ручной проверки</Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Список верифицированных файлов */}
        <Card {...cardStyle}>
          <CardBody>
            <Text fontSize='lg' fontWeight='semibold' color='white' mb={4}>
              Ваши счета
            </Text>

            {isLoading ? (
              <VStack spacing={4}>
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    height='80px'
                    width='100%'
                    startColor='#2a2a3e'
                    endColor='#474D57'
                    borderRadius='12px'
                  />
                ))}
              </VStack>
            ) : (
              <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                gap={4}
              >
                {verifiedFiles?.map((file: VerifiedFile) => (
                  <Card key={file._id} bg='#2a2a3e' borderRadius='12px'>
                    <CardBody>
                      <VStack align='start' spacing={3}>
                        <HStack justify='space-between' w='100%'>
                          <Text fontSize='sm' fontFamily='mono' color='white'>
                            {file.displayCardNumber}
                          </Text>
                          <Badge colorScheme={getVerificationColor(file.isVerified)}>
                            {getVerificationLabel(file.isVerified)}
                          </Badge>
                        </HStack>

                        <VStack align='start' spacing={1}>
                          <Text fontSize='xs' color='gray.400'>
                            Загружен: {formatDate(file.createdAt)}
                          </Text>
                          <Text fontSize='xs' color='gray.400'>
                            Файл: {file.originalName}
                          </Text>
                        </VStack>

                        <Button
                          size='sm'
                          variant='outline'
                          leftIcon={<ViewIcon />}
                          color='white'
                          borderColor='gray.400'
                          _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                          onClick={() => window.open(file.url, '_blank')}
                        >
                          Просмотреть
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </Grid>
            )}

            {(!verifiedFiles || verifiedFiles.length === 0) && !isLoading && (
              <Box textAlign='center' py={8}>
                <Text color='gray.400' mb={4}>
                  У вас нет загруженных документов для верификации
                </Text>
                <Button
                  leftIcon={<AddIcon />}
                  bg='#F0B90B'
                  color='black'
                  onClick={onOpen}
                  _hover={{ bg: '#d9a30b' }}
                >
                  Добавить первый счет
                </Button>
              </Box>
            )}
          </CardBody>
        </Card>

        {/* Модальное окно загрузки */}
        <Modal isOpen={isOpen} onClose={handleCloseModal} size='lg'>
          <ModalOverlay bg='rgba(0, 0, 0, 0.6)' />
          <ModalContent bgColor='#1e1e2a' border='1px solid #2b3139' color='white'>
            <ModalHeader color='white'>Добавить счет для верификации</ModalHeader>
            <ModalCloseButton color='white' />

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleUpload)}>
                <ModalBody>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel color='white'>Номер банковской карты</FormLabel>
                      <Input
                        placeholder='1234 5678 9012 3456'
                        {...methods.register('cardNumber', {
                          required: 'Введите номер карты',
                          onChange: handleCardNumberChange,
                        })}
                        bg='#2a2a3e'
                        borderColor='#474D57'
                        color='white'
                        _placeholder={{ color: '#aaa' }}
                        _hover={{ borderColor: '#F0B90B' }}
                        focusBorderColor='#F0B90B'
                      />
                    </FormControl>

                    <FileUploader name='file' label='Фото банковской карты' required={true} />

                    <Alert
                      status='info'
                      bg='rgba(59, 130, 246, 0.1)'
                      border='1px solid rgba(59, 130, 246, 0.3)'
                      borderRadius='8px'
                    >
                      <AlertIcon color='blue.400' />
                      <Box color='gray.300'>
                        <Text fontSize='sm'>
                          Загрузите четкое фото лицевой стороны карты. Убедитесь, что номер карты
                          хорошо виден. CVV код можно закрыть.
                        </Text>
                      </Box>
                    </Alert>
                  </VStack>
                </ModalBody>

                <ModalFooter bg='#1e1e2a'>
                  <Button variant='ghost' mr={3} onClick={handleCloseModal} color='white'>
                    Отмена
                  </Button>
                  <Button
                    type='submit'
                    bg='#F0B90B'
                    color='black'
                    isLoading={isUploading}
                    _hover={{ bg: '#d9a30b' }}
                  >
                    Загрузить
                  </Button>
                </ModalFooter>
              </form>
            </FormProvider>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default WalletVerification;

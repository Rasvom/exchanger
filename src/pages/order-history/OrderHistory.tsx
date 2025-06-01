import {
  Box,
  Text,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Input,
  Select,
  InputGroup,
  InputLeftElement,
  IconButton,
  Skeleton,
  Alert,
  AlertIcon,
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleUpIcon,
  TriangleDownIcon,
} from '@chakra-ui/icons';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserRequestsPaginatedQuery } from '@store/slices/api/request-service';
import { RequestsFilters, RequestItem } from '@store/slices/api/request-service/types';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<RequestsFilters>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    status: 'all',
    search: '',
  });

  const { data, isLoading, error } = useGetUserRequestsPaginatedQuery(filters);

  // Используем тот же стиль что и на AML & KYC странице
  const cardStyle = {
    bgColor: '#232334',
    boxShadow: '0 2px 24px rgba(24,32,82,.05)',
    borderRadius: '16px',
    border: 'none',
  };

  const borderColor = '#2b3139';

  // Стили для кастомного календаря
  const dateInputStyles = {
    color: 'white',
    borderColor: borderColor,
    bg: '#232334',
    _hover: { borderColor: '#F0B90B' },
    _focus: { borderColor: '#F0B90B', boxShadow: '0 0 0 1px #F0B90B' },
    '&::-webkit-calendar-picker-indicator': {
      filter: 'invert(1)',
      cursor: 'pointer',
    },
    '&::-webkit-datetime-edit': {
      color: 'white',
    },
    '&::-webkit-datetime-edit-fields-wrapper': {
      color: 'white',
    },
    '&::-webkit-datetime-edit-text': {
      color: 'white',
    },
    '&::-webkit-datetime-edit-month-field': {
      color: 'white',
    },
    '&::-webkit-datetime-edit-day-field': {
      color: 'white',
    },
    '&::-webkit-datetime-edit-year-field': {
      color: 'white',
    },
  };

  // Статусы для фильтра
  const statusOptions = [
    { value: 'all', label: 'Все статусы' },
    { value: 'CREATED', label: 'Создана' },
    { value: 'APPROVED', label: 'Одобрена' },
    { value: 'CANCELED', label: 'Отменена' },
    { value: 'COMPLETED', label: 'Завершена' },
  ];

  // Обработчики фильтров
  const handleFilterChange = (key: keyof RequestsFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value, // Сброс на первую страницу при смене фильтров
    }));
  };

  const handleSort = (field: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc',
      page: 1,
    }));
  };

  // Обработчик клика по ID заявки
  const handleRequestClick = (requestId: string) => {
    navigate(`/requests/${requestId}`);
  };

  // Функция получения цвета бейджа статуса
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CREATED':
        return 'blue';
      case 'APPROVED':
        return 'green';
      case 'CANCELED':
        return 'red';
      case 'COMPLETED':
        return 'purple';
      default:
        return 'gray';
    }
  };

  // Функция получения названия статуса
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'CREATED':
        return 'Создана';
      case 'APPROVED':
        return 'Одобрена';
      case 'CANCELED':
        return 'Отменена';
      case 'COMPLETED':
        return 'Завершена';
      default:
        return status;
    }
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

  // Функция форматирования суммы
  const formatAmount = (amount: number | string) => {
    return new Intl.NumberFormat('ru-RU').format(Number(amount));
  };

  // Статистика
  const stats = useMemo(() => {
    if (!data?.stats) return [];

    return Object.entries(data.stats).map(([status, stat]) => ({
      status,
      ...stat,
    }));
  }, [data?.stats]);

  if (error) {
    return (
      <Box p={4} bg='#232334' minH='100vh'>
        <Alert status='error' bg='#2a2a3e' borderColor='red.500' border='1px solid'>
          <AlertIcon color='red.400' />
          <Text color='white'>Ошибка загрузки заявок</Text>
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={4} bg='#232334' minH='100vh'>
      <VStack spacing={6} align='stretch'>
        {/* Заголовок */}
        <Text fontSize='2xl' fontWeight='bold' color='white'>
          История заявок
        </Text>

        {/* Статистика */}
        {stats.length > 0 && (
          <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap={4}>
            {stats.map((stat) => (
              <Card key={stat.status} {...cardStyle}>
                <CardBody>
                  <Stat>
                    <StatLabel color='white'>{getStatusLabel(stat.status)}</StatLabel>
                    <StatNumber color='white'>{stat.count}</StatNumber>
                    <StatHelpText color='gray.300'>
                      Отправлено: {formatAmount(stat.totalSendAmount)} ₽
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            ))}
          </Grid>
        )}

        {/* Фильтры */}
        <Card {...cardStyle}>
          <CardHeader>
            <Text fontSize='lg' fontWeight='semibold' color='white'>
              Фильтры
            </Text>
          </CardHeader>
          <CardBody>
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
              gap={4}
            >
              {/* Поиск */}
              <GridItem>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.300' />
                  </InputLeftElement>
                  <Input
                    placeholder='Поиск по email, счету...'
                    value={filters.search || ''}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    bg='#232334'
                    borderColor={borderColor}
                    color='white'
                    _placeholder={{ color: 'gray.400' }}
                    _hover={{ borderColor: '#F0B90B' }}
                    focusBorderColor='#F0B90B'
                  />
                </InputGroup>
              </GridItem>

              {/* Статус */}
              <GridItem>
                <Select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  borderColor={borderColor}
                  color='white'
                  bg='#232334'
                  _hover={{ borderColor: '#F0B90B' }}
                  focusBorderColor='#F0B90B'
                >
                  {statusOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      style={{ backgroundColor: '#232334', color: 'white' }}
                    >
                      {option.label}
                    </option>
                  ))}
                </Select>
              </GridItem>

              {/* Дата от */}
              <GridItem>
                <Input
                  type='date'
                  placeholder='Дата от'
                  value={filters.dateFrom || ''}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  sx={dateInputStyles}
                />
              </GridItem>

              {/* Дата до */}
              <GridItem>
                <Input
                  type='date'
                  placeholder='Дата до'
                  value={filters.dateTo || ''}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  sx={dateInputStyles}
                />
              </GridItem>
            </Grid>
          </CardBody>
        </Card>

        {/* Таблица */}
        <Card {...cardStyle}>
          <CardBody p={0}>
            {isLoading ? (
              <VStack p={4} spacing={4}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton
                    key={i}
                    height='40px'
                    width='100%'
                    startColor='#2a2a3e'
                    endColor='#474D57'
                    borderRadius='8px'
                  />
                ))}
              </VStack>
            ) : (
              <Box overflowX='auto'>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th
                        cursor='pointer'
                        onClick={() => handleSort('createdAt')}
                        borderColor={borderColor}
                        color='white'
                        _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                        transition='background-color 0.2s'
                      >
                        <HStack justify='space-between' w='100%'>
                          <Text color='white'>Дата</Text>
                          {filters.sortBy === 'createdAt' &&
                            (filters.sortOrder === 'asc' ? (
                              <TriangleUpIcon color='white' />
                            ) : (
                              <TriangleDownIcon color='white' />
                            ))}
                        </HStack>
                      </Th>
                      <Th borderColor={borderColor} color='white'>
                        ID
                      </Th>
                      <Th
                        cursor='pointer'
                        onClick={() => handleSort('sendAmount')}
                        borderColor={borderColor}
                        color='white'
                        _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                        transition='background-color 0.2s'
                      >
                        <HStack justify='space-between' w='100%'>
                          <Text color='white'>Отправка</Text>
                          {filters.sortBy === 'sendAmount' &&
                            (filters.sortOrder === 'asc' ? (
                              <TriangleUpIcon color='white' />
                            ) : (
                              <TriangleDownIcon color='white' />
                            ))}
                        </HStack>
                      </Th>
                      <Th
                        cursor='pointer'
                        onClick={() => handleSort('receiveAmount')}
                        borderColor={borderColor}
                        color='white'
                        _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                        transition='background-color 0.2s'
                      >
                        <HStack justify='space-between' w='100%'>
                          <Text color='white'>Получение</Text>
                          {filters.sortBy === 'receiveAmount' &&
                            (filters.sortOrder === 'asc' ? (
                              <TriangleUpIcon color='white' />
                            ) : (
                              <TriangleDownIcon color='white' />
                            ))}
                        </HStack>
                      </Th>
                      <Th
                        cursor='pointer'
                        onClick={() => handleSort('status')}
                        borderColor={borderColor}
                        color='white'
                        _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                        transition='background-color 0.2s'
                      >
                        <HStack justify='space-between' w='100%'>
                          <Text color='white'>Статус</Text>
                          {filters.sortBy === 'status' &&
                            (filters.sortOrder === 'asc' ? (
                              <TriangleUpIcon color='white' />
                            ) : (
                              <TriangleDownIcon color='white' />
                            ))}
                        </HStack>
                      </Th>
                      <Th borderColor={borderColor} color='white'>
                        Email
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.requests?.map((request: RequestItem) => (
                      <Tr key={request._id}>
                        <Td borderColor={borderColor} color='white'>
                          {formatDate(request.createdAt)}
                        </Td>
                        <Td borderColor={borderColor}>
                          <Text
                            fontSize='sm'
                            fontFamily='mono'
                            color='#F0B90B'
                            cursor='pointer'
                            textDecoration='underline'
                            _hover={{
                              color: '#d9a30b',
                              textDecoration: 'none',
                            }}
                            transition='color 0.2s'
                            onClick={() => handleRequestClick(request._id)}
                          >
                            {request._id.slice(-8)}
                          </Text>
                        </Td>
                        <Td borderColor={borderColor}>
                          <VStack align='start' spacing={1}>
                            <Text fontSize='sm' fontWeight='semibold' color='white'>
                              {formatAmount(request.sendAmount || 0)} ₽
                            </Text>
                            <Text fontSize='xs' color='gray.400'>
                              {request.sendMethod?.name || 'Не указано'}
                            </Text>
                          </VStack>
                        </Td>
                        <Td borderColor={borderColor}>
                          <VStack align='start' spacing={1}>
                            <Text fontSize='sm' fontWeight='semibold' color='white'>
                              {formatAmount(request.receiveAmount || 0) || 0} ₽
                            </Text>
                            <Text fontSize='xs' color='gray.400'>
                              {request.receiveMethod?.name || 'Не указано'}
                            </Text>
                          </VStack>
                        </Td>
                        <Td borderColor={borderColor}>
                          <Badge colorScheme={getStatusColor(request.status)}>
                            {getStatusLabel(request.status)}
                          </Badge>
                        </Td>
                        <Td borderColor={borderColor}>
                          <Text fontSize='sm' color='white'>
                            {request.email}
                          </Text>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                {(!data?.requests || data.requests.length === 0) && !isLoading && (
                  <Box p={8} textAlign='center'>
                    <Text color='gray.400'>Заявки не найдены</Text>
                  </Box>
                )}
              </Box>
            )}
          </CardBody>
        </Card>

        {/* Пагинация */}
        {data?.pagination && (
          <HStack justify='space-between' align='center'>
            <Text fontSize='sm' color='gray.400'>
              Показано {data.requests.length} из {data.pagination.totalCount} заявок
            </Text>

            <HStack>
              <IconButton
                aria-label='Предыдущая страница'
                icon={<ChevronLeftIcon />}
                size='sm'
                isDisabled={!data.pagination.hasPrevPage}
                onClick={() => handleFilterChange('page', filters.page! - 1)}
                color='white'
                bg='transparent'
                border='1px solid'
                borderColor='gray.400'
                _hover={{ bg: 'rgba(255,255,255,0.1)' }}
              />

              <Text fontSize='sm' color='white'>
                Страница {data.pagination.currentPage} из {data.pagination.totalPages}
              </Text>

              <IconButton
                aria-label='Следующая страница'
                icon={<ChevronRightIcon />}
                size='sm'
                isDisabled={!data.pagination.hasNextPage}
                onClick={() => handleFilterChange('page', filters.page! + 1)}
                color='white'
                bg='transparent'
                border='1px solid'
                borderColor='gray.400'
                _hover={{ bg: 'rgba(255,255,255,0.1)' }}
              />
            </HStack>

            <Select
              value={filters.limit}
              onChange={(e) => handleFilterChange('limit', Number(e.target.value))}
              size='sm'
              maxW='100px'
              color='white'
              bg='#232334'
            >
              <option value={5} style={{ backgroundColor: '#232334', color: 'white' }}>
                5
              </option>
              <option value={10} style={{ backgroundColor: '#232334', color: 'white' }}>
                10
              </option>
              <option value={20} style={{ backgroundColor: '#232334', color: 'white' }}>
                20
              </option>
              <option value={50} style={{ backgroundColor: '#232334', color: 'white' }}>
                50
              </option>
            </Select>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default OrderHistory;

import { Button, Flex, useToast } from '@chakra-ui/react';
import { FormProvider, useForm, useWatch, SubmitHandler } from 'react-hook-form';
import { useGetCryptoPricesQuery } from '@store/slices/api/trade-asset-service';
import { useCreateRequestMutation } from '@store/slices/api/request-service';
import { memo, useCallback, useEffect, useState } from 'react';
import ExchangePanel from './ExchangePanel';
import { ExchangeFormData } from './types';
import { getExchangeRate } from './utils/getExchangeRate';
import InputField from '@components/InputField';
import { AtSignIcon, PhoneIcon } from '@chakra-ui/icons';
import CheckboxField from '@components/CheckboxField';
import { useNavigate } from 'react-router-dom';
import { PatternFormat } from 'react-number-format';

const ExchangeForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { data: prices } = useGetCryptoPricesQuery({}, { pollingInterval: 25000 });
  const [createRequest, { isLoading }] = useCreateRequestMutation();

  const methods = useForm<ExchangeFormData>({
    defaultValues: {
      sendAmount: '',
      receiveAmount: '',
      sendMethod: null,
      receiveAccountNumber: null,
      receiveMethod: null,
      termsAgreement: false,
      amlKycAgreement: false,
      email: '',
      phoneNumber: '',
      recipientName: '',
      telegramLink: '',
    },
    mode: 'onChange',
  });

  const {
    control,
    setValue,
    reset,
    formState: { errors },
  } = methods;
  const sendMethod = useWatch({ name: 'sendMethod', control });
  const receiveMethod = useWatch({ name: 'receiveMethod', control });
  const sendAmount = useWatch({ name: 'sendAmount', control });
  const receiveAmount = useWatch({ name: 'receiveAmount', control });

  const termsAgreement = useWatch({ name: 'termsAgreement', control });
  const amlKycAgreement = useWatch({ name: 'amlKycAgreement', control });

  const [activeField, setActiveField] = useState<'sendAmount' | 'receiveAmount' | null>(null);

  useEffect(() => {
    if (activeField === 'sendAmount' && sendMethod && receiveMethod) {
      const rate = getExchangeRate(sendMethod, receiveMethod, prices);
      const calculatedValue = (parseFloat(sendAmount || '0') * rate).toFixed(2);
      setValue('receiveAmount', calculatedValue, { shouldValidate: false, shouldDirty: false });
    }
  }, [sendAmount, sendMethod, receiveMethod]);

  useEffect(() => {
    if (activeField === 'receiveAmount' && sendMethod && receiveMethod) {
      const rate = getExchangeRate(receiveMethod, sendMethod, prices);
      const calculatedValue = (parseFloat(receiveAmount || '0') * rate).toFixed(5);
      setValue('sendAmount', calculatedValue, { shouldValidate: false, shouldDirty: false });
    }
  }, [receiveAmount, sendMethod, receiveMethod]);

  const handleFocus = useCallback(
    (field: 'sendAmount' | 'receiveAmount') => () => {
      setActiveField(field);
    },
    [],
  );

  const onSubmit: SubmitHandler<ExchangeFormData> = async (values) => {
    try {
      const requestData = await createRequest({
        sendMethod: values.sendMethod,
        sendAmount: values.sendAmount,
        receiveMethod: values.receiveMethod,
        receiveAccountNumber: values.receiveAccountNumber || null,
        receiveAmount: values.receiveAmount,
        email: values.email,
        phoneNumber: values.phoneNumber || null,
        recipientName: values.recipientName || null,
        telegramLink: values.telegramLink || null,
      }).unwrap();

      toast({
        title: 'Заявка успешно создана!',
        description: 'Проверьте вашу почту для получения информации.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      reset();
      navigate(`/requests/${requestData._id}`);
    } catch (error: any) {
      toast({
        title: 'Ошибка при создании заявки',
        description: error.data?.error || 'Попробуйте позже',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Flex gap={'50px'} justifyContent={'center'} flexWrap={'wrap'}>
          <ExchangePanel
            title='Отдаете'
            methodName='sendMethod'
            amountName='sendAmount'
            img={sendMethod?.img}
            currencyCode={sendMethod?.symbol}
            onFocus={handleFocus('sendAmount')}
          />
          <ExchangePanel
            title='Получаете'
            methodName='receiveMethod'
            amountName='receiveAmount'
            img={receiveMethod?.img}
            currencyCode={receiveMethod?.symbol}
            onFocus={handleFocus('receiveAmount')}
          >
            <InputField
              name={'email'}
              placeholder='Введите Ваш E-mail'
              Icon={AtSignIcon}
              required={true}
              pattern={{
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Неверный формат email адреса',
              }}
            />
            <InputField
              name={'phoneNumber'}
              placeholder='Номер телефона (для оплаты по СПБ)'
              Icon={PhoneIcon}
              required={true}
              pattern={{
                value: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
                message: 'Некорректный номер телефона',
              }}
              as={PatternFormat}
              format='+7 (###) ###-##-##'
              mask='_'
            />
            <InputField
              name={'receiveAccountNumber'}
              placeholder='Номер карты'
              required={true}
              pattern={{
                value: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
                message: 'Некорректный номер карты',
              }}
              as={PatternFormat}
              format='#### #### #### ####'
              mask='_'
            />
            <InputField name={'recipientName'} placeholder='Имя получателя' required={true} />
            <InputField name={'telegramLink'} placeholder='Ваш Telegram' required={true} />
            <CheckboxField
              name='termsAgreement'
              placeholder='Я согласен c условиями и правилами сервиса'
              required={true}
            />
            <CheckboxField
              name='amlKycAgreement'
              placeholder='Я согласен c условиями AML / CTF & KYC'
              required={true}
            />
            <Button
              type='submit'
              bg={'#F0B90B'}
              minH={'40px'}
              isDisabled={!(termsAgreement && amlKycAgreement) || isLoading}
              isLoading={isLoading}
            >
              Оплатить
            </Button>
          </ExchangePanel>
        </Flex>
      </form>
    </FormProvider>
  );
};

export default memo(ExchangeForm);

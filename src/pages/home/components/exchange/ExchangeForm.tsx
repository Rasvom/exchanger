import { Button, Flex } from '@chakra-ui/react';
import { FormProvider, useForm, useWatch, SubmitHandler } from 'react-hook-form';
import { useGetCryptoPricesQuery } from '@store/slices/api/trade-asset-service';
import { memo, useCallback, useEffect, useState } from 'react';
import ExchangePanel from './ExchangePanel';
import { ExchangeFormData } from './types';
import { getExchangeRate } from './utils/getExchangeRate';
import InputField from '@components/InputField';
import { AtSignIcon, PhoneIcon } from '@chakra-ui/icons';
import CheckboxField from '@components/CheckboxField';

const ExchangeForm = () => {
  const { data: prices } = useGetCryptoPricesQuery({}, { pollingInterval: 25000 });

  const methods = useForm<ExchangeFormData>({
    defaultValues: {
      sendAmount: '',
      receiveAmount: '',
      sendMethod: null,
      receiveMethod: null,
      termsAgreement: false,
      amlKycAgreement: false,
    },
  });

  const { control, setValue } = methods;
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
      const calculatedValue = (parseFloat(receiveAmount || '0') * rate).toFixed(2);
      setValue('sendAmount', calculatedValue, { shouldValidate: false, shouldDirty: false });
    }
  }, [receiveAmount, sendMethod, receiveMethod]);

  const handleFocus = useCallback(
    (field: 'sendAmount' | 'receiveAmount') => () => {
      setActiveField(field);
    },
    [],
  );

  const onSubmit: SubmitHandler<ExchangeFormData> = (data) => {
    console.log(data);
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
            <InputField name={'email'} placeholder='Введите Ваш E-mail' Icon={AtSignIcon} />
            <InputField
              name={'phoneNumber'}
              placeholder='Номер телефона (для оплаты по СПБ)'
              Icon={PhoneIcon}
            />
            <InputField name={'recipientName'} placeholder='Имя получателя' />
            <InputField name={'telegramLink'} placeholder='Ваш Telegram' />
            <CheckboxField
              name='termsAgreement'
              placeholder='Я согласен c условиями и правилами сервиса'
            />
            <CheckboxField
              name='amlKycAgreement'
              placeholder='Я согласен c условиями AML / CTF & KYC'
            />
            <Button
              type='submit'
              bg={'#F0B90B'}
              minH={'40px'}
              isDisabled={!(termsAgreement && amlKycAgreement)}
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

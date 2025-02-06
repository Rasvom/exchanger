import OptionPanel from '@components/OptionPanel';
import NumberInput from '@components/NumberInput';
import CryptosAutocomplete from '../autocompletes/CryptosAutocomplete';
import { ExchangeFormData } from './types';
import { memo } from 'react';

const ExchangePanel = ({
  title,
  methodName,
  amountName,
  img,
  currencyCode,
  onFocus,
  children,
}: {
  title: string;
  methodName: keyof ExchangeFormData;
  amountName: keyof ExchangeFormData;
  img?: string;
  currencyCode?: string;
  onFocus: () => void;
  children?: React.ReactNode;
}) => {
  console.log(123);
  return (
    <OptionPanel title={title}>
      <CryptosAutocomplete name={methodName} />
      <NumberInput
        name={amountName}
        img={img}
        currencyCode={currencyCode}
        onFocus={onFocus}
        placeholder='Введите сумму'
      />
      {children}
    </OptionPanel>
  );
};

export default memo(ExchangePanel);

import SelectField from '@components/SelectField';
import { useGetTradeAssetsQuery } from '@store/slices/api/trade-asset-service';

interface OptionProps {
  name: string;
  symbol: string;
  active: boolean;
}

interface Props {
  name: string;
}

const CryptosAutocomplete = ({ name }: Props) => {
  const { data: cryptosData } = useGetTradeAssetsQuery({});

  return (
    <SelectField
      name={name}
      options={cryptosData || []}
      getOptionLabel={(option: OptionProps) => option.name}
      getOptionValue={(option: OptionProps) => option.symbol}
      isOptionDisabled={(option: OptionProps) => !option.active}
    />
  );
};

export default CryptosAutocomplete;

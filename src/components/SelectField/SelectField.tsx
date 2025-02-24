import { Controller, useFormContext } from 'react-hook-form';
import Select, { Props as SelectProps } from 'react-select';
import selectStyles from './styles/selectStyles';
import SingleValue from './components/SingleValue';
import Option from './components/Option';

interface Props extends SelectProps {
  name: string;
  required?: boolean;
  placeholder?: string;
  options: any[];
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => string;
  isOptionDisabled?: (option: any) => boolean;
}

const SelectField = ({
  name,
  options,
  required,
  placeholder,
  getOptionLabel,
  getOptionValue,
  isOptionDisabled,
  ...rest
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: { value: required || false, message: 'Заполните поле' } }}
      render={({ field, fieldState }) => (
        <>
          <Select
            options={options}
            components={{ SingleValue, Option }}
            placeholder={placeholder || 'Выберите значение'}
            styles={selectStyles}
            {...field}
            {...rest}
            noOptionsMessage={() => 'Нет вариантов'}
            loadingMessage={() => 'Загрузка...'}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            isOptionDisabled={isOptionDisabled}
            menuPortalTarget={document.body}
          />
          {fieldState.error && (
            <span style={{ color: 'red', fontSize: '12px' }}>{fieldState.error.message}</span>
          )}
        </>
      )}
    />
  );
};

export default SelectField;

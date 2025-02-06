import { Stack, FormLabel, Checkbox } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
}

const CheckboxField = ({
  name,
  required,
  placeholder = 'Введите значение',
  label,
  ...rest
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: { value: required || false, message: 'Заполните поле' } }}
      render={({ field, fieldState }) => (
        <Stack spacing={'1px'}>
          {label && (
            <FormLabel htmlFor={name} fontWeight={'400'}>
              {label}
            </FormLabel>
          )}
          <Checkbox {...field} id={name} {...rest}>
            {placeholder}
          </Checkbox>
          {fieldState.error && <span style={{ color: 'red' }}>{fieldState.error?.message}</span>}
        </Stack>
      )}
    />
  );
};

export default CheckboxField;

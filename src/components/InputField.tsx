import { Input, InputGroup, Stack, FormLabel, InputRightElement } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  required?: boolean;
  placeholder?: string;
  Icon?: JSX.ElementType;
  label?: string;
  type?: string;
}

const InputField = ({ name, required, placeholder, type, Icon, label, ...rest }: Props) => {
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
          <InputGroup>
            {Icon && (
              <InputRightElement pointerEvents='none'>
                <Icon color='gray.300' />
              </InputRightElement>
            )}
            <Input
              {...field}
              id={name}
              placeholder={placeholder}
              isInvalid={fieldState.invalid}
              autoComplete='off'
              borderColor='#474D57'
              type={type}
              _hover={{
                borderColor: '#F0B90B',
              }}
              focusBorderColor='#F0B90B'
              {...rest}
            />
          </InputGroup>
          {fieldState.invalid && <span style={{ color: 'red' }}>{fieldState.error?.message}</span>}
        </Stack>
      )}
    />
  );
};

export default InputField;

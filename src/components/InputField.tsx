import { Input, InputGroup, Stack, FormLabel, InputRightElement } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  required?: boolean;
  placeholder?: string;
  Icon?: JSX.ElementType;
  label?: string;
  type?: string;
  pattern?: any;
  color?: string;
  _placeholder?: { color: string };
}

const InputField = ({
  name,
  required = false,
  placeholder = 'Введите значение',
  type,
  Icon,
  label,
  pattern,
  color,
  _placeholder,
  ...rest
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: { value: required, message: 'Заполните поле' },
        pattern: pattern,
      }}
      render={({ field, fieldState }) => (
        <Stack spacing={'1px'}>
          {label && (
            <FormLabel htmlFor={name} fontWeight={'400'} color={color}>
              {label}
            </FormLabel>
          )}
          <InputGroup>
            {Icon && (
              <InputRightElement pointerEvents='none' minH={'50px'}>
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
              color={color}
              _placeholder={
                _placeholder || {
                  color: '#aaa',
                }
              }
              _hover={{
                borderColor: '#F0B90B',
              }}
              focusBorderColor='#F0B90B'
              minH={'50px'}
              {...rest}
            />
          </InputGroup>
          {/* {fieldState.error && <span style={{ color: 'red' }}>{fieldState.error?.message}</span>} */}
        </Stack>
      )}
    />
  );
};

export default InputField;

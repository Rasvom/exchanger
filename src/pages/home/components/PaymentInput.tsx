import {
  Input,
  InputGroup,
  Stack,
  FormLabel,
  InputRightAddon,
  Text,
  Image,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  required?: boolean;
  placeholder?: string;
  img?: string;
  label?: string;
  type?: string;
}

const PaymentInput = ({
  name,
  required,
  placeholder,
  type = 'number',
  img,
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
          <InputGroup>
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
              minH={'50px'}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === '-' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
              onBeforeInput={(e: React.FormEvent<HTMLInputElement>) => {
                const input = e.nativeEvent as InputEvent;
                if (input.data === '-') {
                  e.preventDefault();
                }
              }}
            />
            <InputRightAddon
              minH={'50px'}
              bgColor={'transparent'}
              borderColor='#474D57'
              gap={'10px'}
              p={'10px'}
            >
              <Text fontSize={'lg'} color={'#898f97'} whiteSpace='nowrap'>
                RUB
              </Text>
              {img && <Image src={img} alt='412' height={'30px'} />}
            </InputRightAddon>
          </InputGroup>
          {fieldState.invalid && <span style={{ color: 'red' }}>{fieldState.error?.message}</span>}
        </Stack>
      )}
    />
  );
};

export default PaymentInput;

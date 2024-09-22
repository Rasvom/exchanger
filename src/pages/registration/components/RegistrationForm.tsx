import { FormProvider, useForm } from 'react-hook-form';
import { RegistrationFormValues } from '../types';
import { Box, Button } from '@chakra-ui/react';
import InputField from '@components/InputField';
import { AtSignIcon, EmailIcon, InfoOutlineIcon, LockIcon } from '@chakra-ui/icons';

interface RegistrationFormProps {
  isLoading: boolean;
  isSuccessSendCode: boolean;
  isSuccessVerifyCode: boolean;
  onSubmit: (data: RegistrationFormValues) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  isLoading,
  isSuccessSendCode,
  isSuccessVerifyCode,
  onSubmit,
}) => {
  const methods = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      code: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Box display={'flex'} flexDirection={'column'} gap={'15px'}>
          {!isSuccessSendCode && (
            <InputField
              name='email'
              label='Эл. почта'
              placeholder='Эл. почта'
              required={true}
              Icon={AtSignIcon}
            />
          )}
          {isSuccessSendCode && !isSuccessVerifyCode && (
            <InputField
              name='code'
              label='Код подтвеждения'
              placeholder='Код подтвеждения'
              required={true}
              Icon={EmailIcon}
            />
          )}
          {isSuccessVerifyCode && (
            <>
              <InputField
                name='fullName'
                label='ФИО'
                placeholder='ФИО'
                required={true}
                Icon={InfoOutlineIcon}
              />
              <InputField
                name='password'
                label='Пароль'
                placeholder='Пароль'
                required={true}
                Icon={LockIcon}
              />
            </>
          )}
          <Button type='submit' isLoading={isLoading} bg={'#F0B90B'}>
            Далее
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default RegistrationForm;

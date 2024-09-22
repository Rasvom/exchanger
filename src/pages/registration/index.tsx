import { Box } from '@chakra-ui/react';
import RegistrationForm from './components/RegistrationForm';
import RegistrationStatus from './components/RegistrationStatus';
import {
  useRegistrationMutation,
  useSendConfirmationCodeMutation,
  useVerifyConfirmationCodeMutation,
} from '@store/slices/api/auth-service';
import { RegistrationFormValues } from './types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useShowToastNotification from '@hooks/useShowToastNotification';

const Registration = () => {
  const navigate = useNavigate();

  const [
    handleSendCode,
    { isSuccess: isSuccessSendCode, isLoading: isLoadingSendCode, ...infoSendCode },
  ] = useSendConfirmationCodeMutation();
  const [
    handleVerifyCode,
    { isSuccess: isSuccessVerifyCode, isLoading: isLoadingVerifyCode, ...infoVerifyCode },
  ] = useVerifyConfirmationCodeMutation();
  const [handleRegistration, { isLoading: isLoadingRegistration, isSuccess, ...infoRegistration }] =
    useRegistrationMutation();

  const isLoading = isLoadingSendCode || isLoadingVerifyCode || isLoadingRegistration;

  const onSubmit = (data: RegistrationFormValues) => {
    const { code, ...rest } = data;

    if (!isSuccessSendCode) {
      handleSendCode({ email: data.email });
      return;
    }
    if (!isSuccessVerifyCode) {
      handleVerifyCode({
        email: data.email,
        code: data.code,
      });
      return;
    }

    handleRegistration({ ...rest });
  };

  useEffect(() => {
    if (isSuccess) {
      // navigate('/login');
    }
  }, [isSuccess]);

  useShowToastNotification(infoSendCode, {
    isShowError: true,
    isShowSuccess: true,
  });

  useShowToastNotification(infoVerifyCode, {
    isShowError: true,
    isShowSuccess: true,
  });

  useShowToastNotification(infoRegistration, {
    isShowError: true,
    isShowSuccess: true,
  });

  return (
    <>
      <Box display={'flex'} justifyContent={'center'}>
        <Box
          maxWidth={'sm'}
          border={'1px solid #2b3139'}
          borderRadius={'24px'}
          width={'425px'}
          minHeight={'580px'}
          p={'40px'}
        >
          <RegistrationStatus
            isSuccessSendCode={isSuccessSendCode}
            isSuccessVerifyCode={isSuccessVerifyCode}
          />
          <RegistrationForm
            isLoading={isLoading}
            isSuccessSendCode={isSuccessSendCode}
            isSuccessVerifyCode={isSuccessVerifyCode}
            onSubmit={onSubmit}
          />
        </Box>
      </Box>
    </>
  );
};

export default Registration;

import { Box } from '@chakra-ui/react';

interface RegistrationStatusProps {
  isSuccessSendCode: boolean;
  isSuccessVerifyCode: boolean;
}

const RegistrationStatus: React.FC<RegistrationStatusProps> = ({
  isSuccessSendCode,
  isSuccessVerifyCode,
}) => {
  return (
    <>
      <Box mb={'30px'}>
        {isSuccessSendCode && !isSuccessVerifyCode
          ? 'Подтвердите электронный адрес'
          : isSuccessVerifyCode
            ? 'Заполните данные для завершения регистрации'
            : 'Добро пожаловать на Exchanger'}
      </Box>
      {isSuccessSendCode && !isSuccessVerifyCode && (
        <Box mb={'30px'} color={'#b7bdc6'}>
          6-тизначный код отправлен на ваш адрес эл. почты. Проверочный код необходимо ввести в
          течение 10 минут.
        </Box>
      )}
    </>
  );
};

export default RegistrationStatus;

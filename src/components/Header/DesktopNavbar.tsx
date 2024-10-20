import { Box, Flex, Text } from '@chakra-ui/react';
import Logo from '@components/Logo';
import { Link } from 'react-router-dom';

const DesktopNavbar = () => {
  // const { token, logout } = useAuth();

  return (
    <Flex p={'30px 100px'} justifyContent={'space-between'}>
      <Logo />
      <Flex gap={'30px'}>
        <Box>
          <Link to={'/'}>
            <Text as='h2' fontSize='xl'>
              Обмен
            </Text>
          </Link>
        </Box>
        <Box>
          <Link to={'/aml-kyc-policy'}>
            <Text as='h2' fontSize='xl' whiteSpace={'nowrap'}>
              AML & KYC
            </Text>
          </Link>
        </Box>
        <Box>
          <Link to={'/rules-agreement'}>
            <Text as='h2' fontSize='xl' whiteSpace={'nowrap'}>
              Соглашение о правилах
            </Text>
          </Link>
        </Box>
      </Flex>
      <Flex gap={'30px'}>
        <Box>
          <Link to={'/login'}>
            <Text as='h2' fontSize='xl'>
              Войти
            </Text>
          </Link>
        </Box>
        <Box>
          <Link to={'/registration'}>
            <Text as='h2' fontSize='xl'>
              Регистрация
            </Text>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default DesktopNavbar;

import { Flex, Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const AuthLinks = () => {
  return (
    <Flex gap={'30px'} alignItems={'center'}>
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
  );
};

export default AuthLinks;

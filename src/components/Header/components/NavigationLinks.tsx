import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NavigationLinks = () => {
  return (
    <Flex gap={'30px'} alignItems={'center'}>
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
  );
};

export default NavigationLinks;

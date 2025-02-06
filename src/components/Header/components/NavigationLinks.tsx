import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NavigationLinks = () => {
  return (
    <Flex gap={'30px'} alignItems={'center'}>
      <Box>
        <Link to={'/'}>
          <Text as='h2' fontSize='xl' _hover={{ color: '#F0B90B' }}>
            Обмен
          </Text>
        </Link>
      </Box>
      <Box>
        <Link to={'/aml-kyc-policy'}>
          <Text as='h2' fontSize='xl' whiteSpace={'nowrap'} _hover={{ color: '#F0B90B' }}>
            AML & KYC
          </Text>
        </Link>
      </Box>
      <Box>
        <Link to={'/rules-agreement'}>
          <Text as='h2' fontSize='xl' whiteSpace={'nowrap'} _hover={{ color: '#F0B90B' }}>
            Соглашение о правилах
          </Text>
        </Link>
      </Box>
    </Flex>
  );
};

export default NavigationLinks;

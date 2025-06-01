import { Flex, Text, Link, Box, Icon } from '@chakra-ui/react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box as='footer' py={6} px={4} bg='#1e1e2a' borderTop='1px' borderColor='gray.200'>
      <Flex direction='column' align='center' maxW='1200px' mx='auto'>
        <Text fontSize='sm' color='gray.600' mb={2}>
          © 2023 Exchanger. Все права защищены.
        </Text>
        <Flex gap={4} mt={2}>
          <Link href='https://github.com' isExternal>
            <Icon as={FaGithub} w={5} h={5} color='gray.600' _hover={{ color: 'teal.500' }} />
          </Link>
          <Link href='https://twitter.com' isExternal>
            <Icon as={FaTwitter} w={5} h={5} color='gray.600' _hover={{ color: 'teal.500' }} />
          </Link>
          <Link href='https://linkedin.com' isExternal>
            <Icon as={FaLinkedin} w={5} h={5} color='gray.600' _hover={{ color: 'teal.500' }} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;

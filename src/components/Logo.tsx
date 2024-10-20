import logoIcon from '@assets/logo.png';
import { Box, Flex, Img } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Box>
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <Flex alignItems={'center'} gap={'10px'}>
          <Img src={`${logoIcon}`} alt='logo' width={'60px'} />
          <Box fontSize={32} fontWeight={500} color={'#F0B90B'}>
            Exchanger
          </Box>
        </Flex>
      </Link>
    </Box>
  );
};

export default Logo;

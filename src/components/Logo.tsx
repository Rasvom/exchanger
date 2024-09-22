import logoIcon from '@assets/logo.png';
import { Box, Img } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Box>
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <Box display={'flex'} alignItems={'center'} gap={'10px'}>
          <Img src={`${logoIcon}`} alt='logo' width={'60px'} />
          <Box fontSize={32} fontWeight={500} color={'#F0B90B'}>
            Exchanger
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default Logo;

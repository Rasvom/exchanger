import { memo } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box, Container } from '@chakra-ui/react';

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'50px'} bgColor={'#181a20'} color={'white'}>
      <Header />
      <Container maxW={'140ch'} minH={'100vh'}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default memo(Layout);

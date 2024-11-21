import { memo } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container, Flex } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Flex flexDirection={'column'} gap={'50px'} bgColor={'#181a20'} color={'white'}>
      <Header />
      <Container maxW={'140ch'} minH={'100vh'}>
        {children}
      </Container>
      <Footer />
    </Flex>
  );
};

export default memo(Layout);

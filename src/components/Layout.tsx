import { memo } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container, Flex } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Flex 
      as="main" 
      direction="column" 
      minH="100vh"
      bgColor="#181a20" 
      color="white"
    >
      <Header />
      <Flex 
        as="main"
        flex="1"
        direction="column"
        py={8}
      >
        <Container maxW="140ch" flex="1">
          {children}
        </Container>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default memo(Layout);

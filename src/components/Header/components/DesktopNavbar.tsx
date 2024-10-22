import { Flex } from '@chakra-ui/react';
import Logo from '@components/Logo';
import AuthLinks from './AuthLinks';
import NavigationLinks from './NavigationLinks';

const DesktopNavbar = () => {
  // const { token, logout } = useAuth();

  return (
    <Flex p={'30px 100px'} justifyContent={'space-between'}>
      <Logo />
      <NavigationLinks />
      <AuthLinks />
    </Flex>
  );
};

export default DesktopNavbar;

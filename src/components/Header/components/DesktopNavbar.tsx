import { Flex } from '@chakra-ui/react';
import Logo from '@components/Logo';
import AuthLinks from './AuthLinks';
import NavigationLinks from './NavigationLinks';
import useAuth from '@hooks/useAuth';
import OptionsMenu from './OptionsMenu';

const DesktopNavbar = () => {
  const { token } = useAuth();

  return (
    <Flex p={'30px 100px'} justifyContent={'space-between'} bgColor={'#1e1e2a'}>
      <Logo />
      <NavigationLinks />
      {token ? <OptionsMenu /> : <AuthLinks />}
    </Flex>
  );
};

export default DesktopNavbar;

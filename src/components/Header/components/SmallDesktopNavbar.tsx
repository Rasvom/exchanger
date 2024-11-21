import { Flex } from '@chakra-ui/react';
import Logo from '@components/Logo';
import OptionsMenu from './OptionsMenu';
import NavigationLinks from './NavigationLinks';

const SmallDesktopNavbar = () => {
  return (
    <Flex
      p={'30px 100px'}
      justifyContent={'space-between'}
      alignItems={'center'}
      bgColor={'#1e1e2a'}
    >
      <Logo />
      <NavigationLinks />
      <OptionsMenu />
    </Flex>
  );
};

export default SmallDesktopNavbar;

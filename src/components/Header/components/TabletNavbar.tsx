import { Flex } from '@chakra-ui/react';
import Logo from '@components/Logo';
import OptionsMenu from './OptionsMenu';

const TabletNavbar = () => {
  return (
    <Flex
      p={'30px 10px'}
      justifyContent={'space-between'}
      alignItems={'center'}
      bgColor={'#1e1e2a'}
    >
      <Logo />
      <OptionsMenu />
    </Flex>
  );
};

export default TabletNavbar;

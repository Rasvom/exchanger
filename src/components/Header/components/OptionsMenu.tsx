import { Menu, MenuButton, MenuList, IconButton, MenuItem } from '@chakra-ui/react';
import { HamburgerIcon, SmallCloseIcon } from '@chakra-ui/icons';
import useResponsiveBreakpoints from '@hooks/useResponsiveBreakpoints';
import useAuth from '@hooks/useAuth';
import InformationMenuItems from './InformationMenuItems';
import UserMenuItems from './UserMenuItems';
import AuthMenuItems from './AuthMenuItems';

const OptionsMenu = () => {
  const { isMobile, isLargeMobile, isTablet, isSmallDesktop } = useResponsiveBreakpoints();
  const { token, logout } = useAuth();

  const isResponsiveView = isSmallDesktop || isTablet || isLargeMobile || isMobile;
  const showAuthMenuItems = isResponsiveView && !token;
  const showInformationMenuItems = isTablet || isLargeMobile || isMobile;

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='outline'
        fontSize='24px'
        colorScheme='yellow'
        borderColor='#F0B90B'
      />
      <MenuList bg='black' borderColor='gray'>
        {showAuthMenuItems && <AuthMenuItems />}
        {token && <UserMenuItems />}
        {showInformationMenuItems && <InformationMenuItems />}
        {token && (
          <MenuItem onClick={logout} icon={<SmallCloseIcon fontSize='16px' />} bgColor='black'>
            Выйти
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default OptionsMenu;

import { Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { HamburgerIcon, AddIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import useResponsiveBreakpoints from '@hooks/useResponsiveBreakpoints';

const OptionsMenu = () => {
  const { isMobile, isLargeMobile, isTablet, isSmallDesktop } = useResponsiveBreakpoints();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='outline'
        fontSize={'24px'}
        colorScheme={'yellow'}
        borderColor={'#F0B90B'}
      />
      <MenuList bg={'black'} borderColor={'gray'}>
        {(isSmallDesktop || isTablet || isLargeMobile || isMobile) && (
          <>
            <MenuItem icon={<AddIcon />} command='⌘T' bgColor={'black'}>
              Войти
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />} command='⌘N' bgColor={'black'}>
              Регистрация
            </MenuItem>
          </>
        )}
        {(isTablet || isLargeMobile || isMobile) && (
          <>
            <MenuItem icon={<ExternalLinkIcon />} command='⌘N' bgColor={'black'}>
              Обмен
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />} command='⌘N' bgColor={'black'}>
              AML & KYC
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />} command='⌘N' bgColor={'black'}>
              Соглашение о правилах
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default OptionsMenu;

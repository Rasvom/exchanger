import { useMediaQuery } from '@chakra-ui/react';
import MobileNavbar from './MobileNavbar';
import TabletNavbar from './TabletNavbar';
import DesktopNavbar from './DesktopNavbar';

const Header = () => {
  const [isMobile, isTablet, isDesktop] = useMediaQuery([
    '(max-width: 479px)',
    '(min-width: 480px) and (max-width: 767px)',
    '(min-width: 768px)',
  ]);

  return (
    <>
      {isMobile && <MobileNavbar />}
      {isTablet && <TabletNavbar />}
      {isDesktop && <DesktopNavbar />}
    </>
  );
};

export default Header;

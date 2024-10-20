import { useMediaQuery } from '@chakra-ui/react';
import DesktopNavbar from './DesktopNavbar';

const Header = () => {
  const [isMobile, isTablet, isDesktop] = useMediaQuery([
    '(max-width: 479px)',
    '(min-width: 480px) and (max-width: 767px)',
    '(min-width: 768px)',
  ]);

  return (
    <>
      {/* {isMobile && <MobileNavbar />}
      {isTablet && <TabletNavbar />} */}
      {true && <DesktopNavbar />}
    </>
  );
};

export default Header;

import DesktopNavbar from './components/DesktopNavbar';
import SmallDesktopNavbar from './components/SmallDesktopNavbar';
import useResponsiveBreakpoints from '@hooks/useResponsiveBreakpoints';
import TabletNavbar from './components/TabletNavbar';

const Header = () => {
  const { isMobile, isLargeMobile, isTablet, isSmallDesktop, isDesktop } =
    useResponsiveBreakpoints();

  return (
    <>
      {(isTablet || isMobile || isLargeMobile) && <TabletNavbar />}
      {isSmallDesktop && <SmallDesktopNavbar />}
      {isDesktop && <DesktopNavbar />}
    </>
  );
};

export default Header;

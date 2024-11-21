import { useMediaQuery } from '@chakra-ui/react';

const useResponsiveBreakpoints = () => {
  const [isMobile, isLargeMobile, isTablet, isSmallDesktop, isDesktop] = useMediaQuery([
    '(max-width: 480px)',
    '(min-width: 480px) and (max-width: 767px)',
    '(min-width: 768px) and (max-width: 979px)',
    '(min-width: 980px) and (max-width: 1199px)',
    '(min-width: 1200px)',
  ]);

  return { isMobile, isLargeMobile, isTablet, isSmallDesktop, isDesktop };
};

export default useResponsiveBreakpoints;

import { Icon, MenuItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import BitcoinIcon from '@assets/icons/BitcoinIcon';

const InformationMenuItems = () => {
  const navigate = useNavigate();

  const handleNavigate = (link: string) => {
    navigate(link);
  };

  return (
    <>
      <MenuItem
        onClick={() => handleNavigate('/')}
        icon={
          <Icon fontSize='16px' color='white'>
            <BitcoinIcon />
          </Icon>
        }
        bgColor={'black'}
      >
        Обмен
      </MenuItem>
      <MenuItem
        onClick={() => handleNavigate('aml-kyc-policy')}
        icon={<InfoOutlineIcon fontSize='16px' />}
        bgColor={'black'}
      >
        AML & KYC
      </MenuItem>
      <MenuItem
        onClick={() => handleNavigate('rules-agreement')}
        icon={<InfoOutlineIcon fontSize='16px' />}
        bgColor={'black'}
      >
        Соглашение о правилах
      </MenuItem>
    </>
  );
};

export default InformationMenuItems;

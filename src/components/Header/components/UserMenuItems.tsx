import { Icon, MenuItem } from '@chakra-ui/react';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@assets/icons/PersonIcon';

const UserMenuItems = () => {
  const navigate = useNavigate();

  const handleNavigate = (link: string) => {
    navigate(link);
  };

  return (
    <>
      <MenuItem
        onClick={() => handleNavigate('profile')}
        icon={
          <Icon fontSize='16px' color='white'>
            <PersonIcon />
          </Icon>
        }
        bgColor={'black'}
      >
        Профиль
      </MenuItem>
      <MenuItem
        onClick={() => handleNavigate('order-history')}
        icon={<EditIcon fontSize='16px' />}
        bgColor={'black'}
      >
        История заявок
      </MenuItem>
      <MenuItem
        onClick={() => handleNavigate('wallet-verification')}
        icon={<CheckIcon fontSize='14px' />}
        bgColor={'black'}
      >
        Верификация счета
      </MenuItem>
    </>
  );
};

export default UserMenuItems;

import { MenuItem } from '@chakra-ui/react';
import { AddIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const AuthMenuItems = () => {
  const navigate = useNavigate();

  const handleNavigate = (link: string) => {
    navigate(link);
  };

  return (
    <>
      <MenuItem onClick={() => handleNavigate('login')} icon={<AddIcon />} bgColor={'black'}>
        Войти
      </MenuItem>
      <MenuItem
        onClick={() => handleNavigate('registration')}
        icon={<ExternalLinkIcon />}
        bgColor={'black'}
      >
        Регистрация
      </MenuItem>
    </>
  );
};

export default AuthMenuItems;

import React from 'react';
import { useRouter } from '../../../utils/router';
import { getUser, logout } from '../../../utils/auth'
import { MdExitToApp as LogoutIcon } from 'react-icons/md';

import MenuDropDownUserHeader from '../../DropDownUserHeader';

const UserMenu = () => {
  const router = useRouter();

  const logOut = () => {
    logout();
    router.push('/');
  };

  const MenuOptions = (
    <ul>
      <li onClick={logOut}>
        <p>Exit</p>
        <LogoutIcon />
      </li>
    </ul>
  );

  return (
    <MenuDropDownUserHeader label={getUser()}>
      {MenuOptions}
    </MenuDropDownUserHeader>
  );
};

export default UserMenu;

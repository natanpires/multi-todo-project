import React, { useState } from 'react';
import { MdKeyboardArrowDown as ArrowDown } from 'react-icons/md';

import * as S from './styles';

const theme = {
  top: '54px',
  right: '0',
  overflow: 'hidden',
  bottom: 'initial',
  left: 'initial',
};

const MenuDropDownUserHeader = (props) => {
  const [visible, setVisible] = useState(false);

  const { children, label } = props;

  const toggleDropDown = () => {
    setVisible(!visible);
  };

  const icon = props.icon || <ArrowDown className="chevron-down" />;

  const buildRender = () => {
    let DropDownClass = '';

    if (visible) {
      DropDownClass = `show user-menu`;
    }

    return (
      <S.DropDownStyle>
        <S.DropDownContainer>
          <button
            className="text user-menu"
            onClick={toggleDropDown}
            type="button"
          >
            <b>{label}</b>
            {icon}
          </button>
          <S.ListDropDown
            className={DropDownClass}
            theme={{
              visible,
              left: theme.left,
              top: theme.top,
              right: theme.right,
              bottom: theme.bottom,
              overflow: theme.overflow,
            }}
          >
            {children}
          </S.ListDropDown>
        </S.DropDownContainer>
      </S.DropDownStyle>
    );
  };

  return buildRender();
};

export default MenuDropDownUserHeader;

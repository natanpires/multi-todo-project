import * as S from './styles';

import UserMenu from './UserMenu';
function Navbar() {

  return (
    <S.Wrapper>
      <S.Container>
        <S.Title to="/">TODO List</S.Title>

        <S.ProfileWrapper>
          <UserMenu />
        </S.ProfileWrapper>
      </S.Container>
    </S.Wrapper>
  );
}

export default Navbar;

import * as S from './styles';

function AuthLayout({ children, title = 'TODO List', action = {} }) {
  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.Title>{title}</S.Title>

        {children}

        <S.LinkWrapper>
          <S.Link to={action.link}>{action.title}</S.Link>
        </S.LinkWrapper>
      </S.ContentWrapper>
    </S.Wrapper>
  );
}

export default AuthLayout;

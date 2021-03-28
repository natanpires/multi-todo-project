import * as S from './styles';

function Tooltip({ children, title }) {
  return (
    <S.Wrapper>
      {children}
      <S.Text>{title}</S.Text>
    </S.Wrapper>
  );
}

export default Tooltip;

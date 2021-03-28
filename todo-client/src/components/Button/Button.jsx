import styled, { css } from 'styled-components';

const Button = styled.button`
  ${({ fullWidth }) => css`
    background: #03b5d9;
    border: 0;
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 2% 5%;
    height: auto;
    max-height: 305.36px;

    ${fullWidth &&
    css`
      width: 100%;
    `}
  `}
`;

export default Button;

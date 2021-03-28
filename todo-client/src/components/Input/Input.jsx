import styled, { css } from 'styled-components';

const inputModifiers = {
  onError: () => css`
    border-color: #e74c3c;

    &:focus {
      box-shadow: 0 0 0 1.5px #e74c3c;
    }
  `,
};

export const Input = styled.input`
  ${({ error }) => css`
    border: 1.5px solid #a7a7a7;
    border-radius: 5px;
    font-size: 1.5rem;
    padding: 2% 5%;
    width: 100%;
    height: auto;
    max-height: 305.36px;

    ${!!error && inputModifiers.onError()}
  `}
`;

export default Input;

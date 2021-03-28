import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Text = styled.span`
  visibility: hidden;
  position: absolute;
  padding: 0.5em;
  margin-bottom: 1em;
  bottom: 100%;
  transform: translateX(-50%);
  color: #00000070;
  border-radius: 5px;
  background-color: #EDEDED;
  font-size: 0.8em;
  box-shadow: 0 3px 16px rgb(0 0 0 / 15%);

  ${Wrapper}:hover & {
    visibility: visible;
  }
`;

import styled from 'styled-components';
import { Link as LinkBase } from 'react-router-dom';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h1`
  color: #00000070;
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 0.8rem;
`;

export const ContentWrapper = styled.div`
  max-width: 400px;
  width: 100%;
`;

export const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-height: 305.36px;
`;

export const Link = styled(LinkBase)`
  color: #00000070;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  width: 100%;
  margin-top: 1rem;
  color: #FFF;
  background-color: #03b5d9;
  border-radius: 5px;
  padding: 7px 0;
`;

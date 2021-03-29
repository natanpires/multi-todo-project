import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.header`
  background: #ededed;
  box-shadow: 0px 2px 20px 0px rgb(0 0 0 / 16%);
  padding: 8px calc(16px);
  margin: 0px auto;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px auto;
  max-width: 1300px;
  padding: 8px calc(16px);
  width: 100%;
`;

export const Title = styled(Link)`
  color: #00000070;
  font-size: 2.4rem;
  font-weight: bold;
  margin: 1.6rem 0;
  text-decoration: none;
`;

export const ProfileWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-right: 5%;

  & > :not(:last-child) {
    margin-right: 1.6rem;
  }
`;

export const Profile = styled.span`
  color: #00000070;
  font-size: 1.6rem;
  font-weight: bold;
`;

export const ProfileLogout = styled.button`
  background: #fff;
  border: 1px solid #195b92;
  border-radius: 0.4rem;
  color: #195b92;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.4rem 0.8rem;
`;

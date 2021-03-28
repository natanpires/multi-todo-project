import Styled from 'styled-components';

export const DropDownStyle = Styled.div`
  display: flex;
  justify-content: initial;
  align-items: center;
  transition: all .3s ease 0s;
`;

export const DropDownContainer = Styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  > b {
    color: #00000070;
  }

  > button {
    font-family: 'Avenir';
    font-style: normal;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    min-width: 200px;
    font-size: .9rem;
    line-height: 1rem;
    border-style: solid;
    border-width: 1px;
    padding: .5rem 15px;
    cursor: pointer;
    outline: none;
    border-radius: 7px;
    color: #231F20;
    background: transparent;
    border-color: #E0E0E0;
    transition: all .6s ease 0s;
    z-index: 1;

    &:hover {
    color: #ffffff;
    background: #ededed;
    border-color: #ededed;

/*
      & svg {
        stroke: #ffffff !important;

        > path,
        > rect {
            stroke: #ffffff !important;
        }
      } */
    }

    &:disabled {
      opacity: .6;
    }

    &.text {
      border: none;
      font-weight: normal;
      background: none;
      line-height: 12px;
      font-size: 15px;
      min-width: initial;
      padding: 0;

      &.user-menu {

        &:hover {
          color: #000000;
          background: transparent;
          border-color: none;
        }
      }
    }

    & svg {
      height: 100%;
      width: auto;
      margin: 0 0 0 14px;
      transition: all .5s ease 0s;

      &.chevron-down {
        transform: rotate(360deg);
        transform-origin: 50% 50%;
      }

      &.chevron-right{
        transform: rotate(270deg);
        transform-origin: 50% 50%;
      }
    }
  }
`;

export const ListDropDown = Styled.div`
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.25);
  background-color: #FFF;
  backdrop-filter: blur(10px);
  border: 1px solid #E5E5E5;
  border-radius: 7px;
  position: absolute;
  left: ${({ theme }) => theme.left};
  top: ${({ theme }) => theme.top};
  right: ${({ theme }) => theme.right};
  bottom: ${({ theme }) => theme.bottom};
  z-index: 100;
  height: auto;
  opacity: 0;
  visibility: hidden;
  max-height: 0;
  width: fill-available;
  padding: 0 16px;
  transition: all .3s ease-in-out;
  overflow: ${({ theme }) => theme.overflow};
  overflow-y: inherit;
  border-radius: 7px;
  z-index: 100;

  &.show{
    opacity: 1;
    visibility: visible;
    max-height: 300px;
  }

  & span {
    color: #333333;
    display: block;
    font-size: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f1f1;
  }

  & ul,
  & ol {
    display: block;
    height: auto;
    margin: 0;
    padding: 0;

    > li {
      cursor: pointer;
      display: flex;
      min-width: 150px;
      justify-content: space-between;
      align-items: center;
      line-height: 25px;
      color: #333333;
      font-size: 14px;
      margin: 0 -16px;
      padding: 1px 16px;
      white-space: nowrap;
      overflow: ${({ theme }) => theme.overflow};
      text-overflow: ellipsis;

      &:hover {
        background-color: rgb(226 226 226 / 0.5);
        color: #000000;
      }

      & p,
      & a,
      & span {
        color: #333333;
        font-size: 14px;
      }

      & p{
        margin: 0;
      }
    }

    div {
      padding: 7px 0;

      > li {
        cursor: pointer;
        display: flex;
        min-width: 150px;
        justify-content: space-between;
        align-items: center;
        line-height: 25px;
        color: #333333;
        font-size: 14px;
        margin: 0 -16px;
        padding: 1px 16px;
        white-space: nowrap;
        overflow: ${({ theme }) => theme.overflow};
        text-overflow: ellipsis;

        &:hover {
          background-color: rgb(226 226 226 / 0.5);
          color: #000000;
        }

        & p,
        & a,
        & span {
          color: #333333;
          font-size: 14px;
        }

        & p{
          margin: 0;
        }
      }
    }
  }

  &.user-menu {
    max-height: initial;
    overflow: visible;
    overflow-y: initial;
    min-width: 191px;

    & ul,
    & ol {

      > li {
        &:first-of-type {
          padding: 13px 16px;

          p{
            color: #EB5757;
            font-weight: 800;
          }
        }
      }
    }
  }
`;

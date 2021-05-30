import styled, { css } from "styled-components";

export const MyHeader = styled.header`
  background-color: #ffffff;
  border-bottom: 4px solid #ffffff;
  padding: 20rem 30rem;
  position: fixed;
  width: 100%;
  z-index: 100;

  @media(max-width: 800px){
    padding: 15rem 16rem;
    max-height: 70px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media(max-width: 800px){
    justify-content: center;
  }
`;

export const Button = styled.button`
  position: relative;
  padding: 12rem 30rem;
  background-color: #3a4042;
  color: #f5f5f5;
  border: 1px solid #f5f5f5;
  border-radius: 4px;
  font-size: 20rem;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;

  ${({ logout }) =>
    logout &&
    css`
      font-size: 20rem;
      padding: 8rem 8rem;
      background-color: #f91c24;
      position: fixed;
      right: 20px;
      top: 80px;
    `};

  ${({ secret }) =>
  secret &&
  css`
    font-size: 20rem;
    padding: 8rem 8rem;
    background-color: #009b14;
    position: fixed;
    right: 20px;
    top: 20px;
  `};
`;
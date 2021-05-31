import styled, { css } from "styled-components";

export const MyHeader = styled.header`
  padding: 20rem 30rem;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  @media(max-width: 800px){
    padding: 15rem 15rem;
    max-height: 70px;
  }
`;

export const Logo = styled.img`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  height: 89px;
  background-image: ${({ logo }) => `url(${logo})`};
  background-position: center;
`;

export const Button = styled.button`
  position: relative;
  margin-top: 15rem;
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
      right: 20rem;
      top: 2rem;
    `};
  @media(max-width: 800px){
    ${({ logout }) =>
    logout &&
    css`
      font-size: 20rem;
      padding: 8rem 8rem;
      background-color: #f91c24;
      position: fixed;
      right: 10rem;
      top: 1rem;
    `};
  }
`;
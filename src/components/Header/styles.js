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
  background-color: var(--color-black-dark);
  color: var(--color-white);
  border: 1px solid var(--color-white);
  border-radius: 40px;
  font-size: 20rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;

  &:hover { 
    opacity: 0.9;
    cursor: pointer;
  }

  ${({ register }) =>
    register &&
    css`
      background-color: var(--color-cyan-blue);
  `};

  ${({ logout }) =>
    logout &&
    css`
      font-size: 20rem;
      padding: 8rem 8rem;
      background-color: var(--color-red);
      position: absolute;
      right: 20rem;
      top: 2rem;
  `};

  ${({ reset }) =>
    reset &&
    css`
      background-color: var(--color-fiery-rose);
      top: 10rem;
  `};

  ${({ change }) =>
    change &&
    css`
      background-color: var(--color-very-green);
      top: -9rem;
  `};
  
  @media(max-width: 800px){
    padding: 10rem 15rem;

    ${({ logout }) =>
      logout &&
      css`
        font-size: 15rem;
        padding: 8rem 8rem;
        background-color: var(--color-red);
        right: 10rem;
        top: 1rem;
    `};
    
    ${({ register }) =>
      register &&
      css`
        font-size: 20rem;
        padding: 10rem 15rem;
        position: relative;
        right: 7rem;
        margin-top: 15rem;
        margin-left: 10rem;
    `};
  }
`;
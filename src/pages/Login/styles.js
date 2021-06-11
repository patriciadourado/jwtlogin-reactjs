import styled, { css } from "styled-components";
import { Button, Logo } from "../../components/Header/styles";

export const Wrapper = styled.form`
  padding: 66rem 10rem;
  background-color: white;

  & ${Button}{
   width: 300rem;
   margin: 1rem 0 1rem 25rem;
  }
  & ${Logo}{
    justify-content: center;
    display: flex;
    margin: auto;
  }
  @media(max-width: 800px){
    justify-content: center;
    & ${Button}{
      font-size: 20rem;  
    }
  }
`;

export const WrapperPassword = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;

`;
export const IconVisibility = styled.i`
  position: absolute;
  top: 22px;
  right: 12%;
  width: 22px;
  height: 22px;
  background-image: ${({ eye }) => `url(${eye})`};
  display:inline-block;
  
  &:hover { 
    opacity: 0.5;
    cursor: pointer;
  }
`;

export const LoginBox = styled.section`
  justify-content: center;
  width: 350rem;
  height: 300rem;
  margin: 30rem auto;
  align-items: center;
  padding-top: 25rem;
  box-shadow: 0rem 13rem 40rem -13rem rgba(0,0,0,0.75);
`;

export const LoginLabel = styled.h1`
  display: flex;
  justify-content: center;
  margin: 10rem 0rem;
  font-size: 30rem;
  color: var(--color-black);
`;

export const Label = styled.label`
  font-size: 16rem;
  margin: 20rem 0 1rem 25rem;
  color: var(--color-black-dark);
  font-weight: 20px;
  text-align: justify;
  text-justify: center;
  @media(max-width: 800px){
    font-size: 14px;  
  }

  ${({ small }) => 
  small &&
  css`
    margin: -9rem 0 10rem 25rem;
    font-size: 14rem;
    display: flex;
    color: var(--color-red);
    font-weight: 12px;
    text-align: justify;
    /* text-justify: center; */
  `};
`;

export const MyInput = styled.input`
  width: 300rem;
  padding: 15rem;
  margin: 10rem 0 15rem 25rem;
  display: inline-block;
  border: none;
  background: var(--color-input);
`;

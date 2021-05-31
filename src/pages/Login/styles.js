import styled from "styled-components";
import { Button, Logo } from "../../components/Header/styles";

export const Wrapper = styled.form`
  padding: 66rem 10rem;
  background-color: white;

  & ${Button}{
   width: 300rem;
   margin: 10rem 0 1rem 25rem; //CHUTEI HORRORES AQUI BICHO
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
  top: 38%;
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
  color: black;
`;

export const Label = styled.label`
  font-size: 18rem;
  margin: 20rem 0 1rem 25rem;
  color: #3a4042;
  font-weight: 20px;
  text-align: justify;
  text-justify: center;
  @media(max-width: 800px){
    font-size: 15px;  
  }
`;

export const MyInput = styled.input`
  width: 300rem;
  padding: 15rem;
  margin: 15rem 0 15rem 25rem;
  display: inline-block;
  border: none;
  background: #f1f1f1;
`;

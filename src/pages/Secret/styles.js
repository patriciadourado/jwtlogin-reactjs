import styled from 'styled-components';

export const WrapperSecret =  styled.header`
  display: flex;
  justify-content: space-between;
`;

export const Tag = styled.h2`
  display: flex;
  font-size: 40rem;
  height: auto;
  letter-spacing: 2px;
  background-color: #009b14;
  color: #f5f5f5;
  padding: 20rem 18rem; 
  
  @media(max-width: 800px){
    font-size: 15rem;
    margin: 0 80rem 0 0;
  }
`;
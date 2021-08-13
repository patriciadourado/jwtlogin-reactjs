import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/Header/styles';
import { RegisterLabel, Wrapper } from './styles';
import { login } from '../../auth';

export function Finalize(){
  const API_URL = process.env.REACT_APP_API_URL;
  const queryParams = new URLSearchParams(useLocation().search);
  const token = queryParams.get('token');
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(API_URL+'/api/finalize', {
      method: 'get',
      headers: { 
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token, 
      }
    }).then(res => res.json())
      .then(token => {
        if (token.access_token){
          login(token)
          setUser(token.user);
        }
      }).catch(err => console.log(err))
  },);
  
    
  if(!user){
    return(
      <RegisterLabel>Legen.. wait for it.. dary!</RegisterLabel>
    );
  }
    
  return(
    <Wrapper>
      <RegisterLabel>Welcome {user}!</RegisterLabel>
      <Link to="/">
        <Button register>Enjoy the App!</Button>
      </Link>
    </Wrapper>
  );

}

export function Sent(){

  return(
    <Wrapper>
      <RegisterLabel>Email sent, please verify your e-mail and login!</RegisterLabel>
      <Link to="/">
        <Button register>Back</Button>
      </Link>
    </Wrapper>
  );
}
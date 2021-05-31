import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom";
import {login, useAuth} from "../../auth";
import { Button, Logo } from "../../components/Header/styles";
import { Label, LoginBox, LoginLabel, MyInput, Wrapper } from "./styles";
import logo from "../../assets/logo-flask.png";

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [logged] = useAuth();

  const onSubmitClick = (e)=>{
    e.preventDefault()
    let opts = {
      'username': username,
      'password': password
    }
    fetch('/api/login', {
      method: 'post',
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(token => {
        if (token.access_token){
          login(token)
          return <Redirect to="/secret" />;
        }
        else {
          alert("Please type in correct username/password");
          setUsername('')
          setPassword('')
        }
      })
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <Wrapper>
      {!logged?
        <>
          <Link to="/">
            <Logo logo={logo} />
          </Link>
          <LoginLabel>Log-in</LoginLabel>
          <LoginBox>
            <Label>Username</Label>
            <MyInput 
              type="text" 
              placeholder="Username" 
              onChange={handleUsernameChange}
              value={username} 
            />
            <Label>Password</Label>
            <MyInput
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
            />
            <Button onClick={onSubmitClick} type="submit">
              Log in
            </Button>
          </LoginBox>
        </>
      : 
        <Redirect to="/secret" />
      }
      </Wrapper>
  )
}

export default Login;
import React, {useState} from "react";
import { Link } from "react-router-dom";
import {login, useAuth, logout} from "../../auth";
import { Button } from "../../components/Header/styles";
import { Label, LoginBox, LoginLabel, MyInput, Wrapper } from "./styles";

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
      <> 
        <Link to="/secret">
          <Button secret>Secret</Button>
        </Link>
        <Button logout onClick={() => logout()}>Logout</Button>
      </>
      }
      </Wrapper>
  )
}

export default Login;
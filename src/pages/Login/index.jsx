import React, {useState} from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import {login, useAuth} from "../../auth";
import { Button, Logo } from "../../components/Header/styles";
import { IconVisibility, Label, LoginBox, LoginLabel, MyInput, Wrapper, WrapperPassword } from "./styles";
import logo from "../../assets/logo-flask.png";
import eye from "../../assets/eye.ico";

function Login({ endpoint, buttonLabel, messageError }) {
  const [showMessageError, setShowMessageError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(messageError);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [logged] = useAuth();
  const API_URL = process.env.REACT_APP_API_URL;
  
  function toggleVisibility(){
    setShowPassword(!showPassword);
  }

  const onSubmitClick = (e)=>{
    e.preventDefault()
    let opts = {
      'username': username,
      'password': password
    }
    if (!opts.username.trim() || !opts.password.trim()){
      setErrorMessage("Enter a valid username and password!");
      setShowMessageError(true);
    }
    else{
      fetch(API_URL+endpoint, {
        method: 'post',
        body: JSON.stringify(opts)
      }).then(r => r.json())
        .then(token => {
          if (token.access_token){
            login(token)
            return <Redirect to="/secret" />;
          }
          else {
            setShowMessageError(true);
          }
        }).catch(err => console.log(err))
    }
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
            <Logo logo={logo} src={logo} alt="Home" title="Home"/>
          </Link>
          <LoginLabel>{buttonLabel}</LoginLabel>
          <LoginBox>
            <Label>Username</Label>
            <MyInput 
              type="text" 
              placeholder="Username" 
              onChange={handleUsernameChange}
              value={username} 
              required
            />
            <Label>Password</Label>
            <WrapperPassword>
              <MyInput
                type={showPassword ? "text": "password"}
                placeholder="Password"
                onChange={handlePasswordChange}
                value={password}
                required
              >
              </MyInput>
              <IconVisibility onClick={toggleVisibility} eye={eye}></IconVisibility>
              {showMessageError &&
                <Label small>{errorMessage}</Label>
              }
              <Link to="/reset" style={{ textDecoration: 'none' }}>
                <Label reset>Forgot Password?</Label>
              </Link>
            </WrapperPassword>
            <Button onClick={onSubmitClick} type="submit">
              {buttonLabel}
            </Button>
          </LoginBox>
        </>
      : 
        <Redirect to="/secret" />
      }
      </Wrapper>
  )
}

Login.propTypes = {
  endpoint: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  messageError: PropTypes.string.isRequired
};
export default Login;
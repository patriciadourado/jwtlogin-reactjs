import React, {useState} from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import {login, useAuth} from "../../auth";
import { Button, Logo } from "../../components/Header/styles";
import { 
  IconVisibility,
  Label, 
  LoginLabel, 
  MyInput, 
  Wrapper, 
  WrapperPassword } from "../Login/styles";
import logo from "../../assets/logo-flask.png";
import eye from "../../assets/eye.ico";
import RegistrationBox from "./styles";

function Registration({ endpoint }) {
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  
  const [showEmailError, setShowEmailError] = useState(false);
  const [emailError, setEmailError] = useState('');
  
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordError,setPasswordError ] = useState('');
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [logged] = useAuth();
  const API_URL = process.env.REACT_APP_API_URL;
  
  function toggleVisibility(){
    setShowPassword(!showPassword);
  }

  function validatePassword(){
    if(password.length < 8){
      setPasswordError('The password must have at least 8 characters!');
      return false;
    }
    if(password.length > 30){
      setPasswordError('The password must have maximum of 30 characters!');
      return false;
    }
    if(!password.match(/[a-z]/)){
      setPasswordError('The password must have at least 1 lowcase character!');
      return false;
    }
    if(!password.match(/[A-Z]/)){
      setPasswordError('Must have at least 1 uppercase character!');
      return false;
    }
    if(!password.match(/[0-9]/)){
      setPasswordError('Must have at least 1 numberic character!');
      return false;
    }
    if(!password.match(/[!@#$%^&?*]/)){
      setPasswordError('Must have at least 1 special character!');
      return false;
    }
    return true;
  }

  function validateEmail(){
    if(!email){
      setEmailError('Empty email, enter a valid email address!');
      return false;
    }
    if(email.search("@") < 0){
      setEmailError('Missing @, enter a valid email address!');
      return false;
    }
    var recipient = email.substr(0, email.search("@"));
    var domain = email.substr(email.search("@") + 1);
    
    if(recipient.length < 1 || recipient.length > 64){
      setEmailError('Invalid recipient name, enter a valid email address!');
      return false;
    }
    if(domain.length < 1 || domain.length > 253){
      setEmailError('Invalid domain name, enter a valid email address!');
      return false;
    }
    if(recipient.charAt(0) === "." || recipient.charAt(recipient.length - 1) === "."
    || recipient.charAt(0) === "-" || recipient.charAt(recipient.length - 1) === "-"
    || recipient.charAt(0) === "_" || recipient.charAt(recipient.length - 1) === "_"
    || recipient.charAt(0) === "+" || recipient.charAt(recipient.length - 1) === "+"
    ){
      setEmailError('Invalid recipient name!');
      return false;
    }
    if(domain.charAt(0) === "." || domain.charAt(domain.length - 1) === "."
    || domain.charAt(0) === "-" || domain.charAt(domain.length - 1) === "-"
    || domain.charAt(0) === "_" || domain.charAt(domain.length - 1) === "_"
    || domain.charAt(0) === "+" || domain.charAt(domain.length - 1) === "+"
    ){
      setEmailError('Invalid domain name!');
      return false;
    }
    if(recipient.match(/\.\./)){//two consecutive dots on recipient part
      setEmailError('Invalid recipient name, consecutive dots!');
      return false;
    }
    if(domain.match(/\.\./)){//two consecutive dots on domain part
      setEmailError('Invalid domain name, consecutive dots!');
      return false;
    }
    if(!recipient.match(/^[A-Za-z0-9!#%&`_=\\/$'*+?^{}|~.\-" ]+$/)){//invalid character on recipient part
      setEmailError('Invalid recipient name, enter a valid email address!');  
    return false;
    }
    if(!domain.match(/^[A-Za-z0-9.-]+$/)){//invalid character on domain part
      setEmailError('Invalid domain name, enter a valid email address!');
      return false;
    }
    if(!domain.match(/\./)){
      setEmailError('Invalid top level email domain!');
      return false;
    }
    return true;
  }

  const onSubmitClick = (e)=>{
    e.preventDefault()
    let opts = {
      'username': username,
      'password': password
    }
    // Validate Password
    if(!validatePassword())
      setShowPasswordError(true);
    else
      setShowPasswordError(false);
    
      // Validate Email
    if(!validateEmail())
      setShowEmailError(true);
    else
      setShowEmailError(false);

      //Check if a Username is empty!
    if (!opts.username.trim()){
      setUsernameError("Enter a valid username!");
      setShowUsernameError(true);
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
            setUsernameError('Username already taken, try a new one!');
            setShowUsernameError(true);
          }
        })
    }
  }
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
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
          <LoginLabel>Registration</LoginLabel>
          <RegistrationBox>
            <Label>Username</Label>
            <MyInput 
              type="text" 
              placeholder="Username" 
              onChange={handleUsernameChange}
              value={username} 
              required
            />
            {showUsernameError &&
              <Label small>{usernameError}</Label>
            }
            <Label>Email</Label>
            <MyInput 
              type="text" 
              placeholder="Email" 
              onChange={handleEmailChange}
              value={email} 
              required
            />
            {showEmailError &&
              <Label small>{emailError}</Label>
            }
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
              {showPasswordError &&
                <Label small>{passwordError}</Label>
              }
            </WrapperPassword>
            <Button onClick={onSubmitClick} type="submit">
              Register
            </Button>
          </RegistrationBox>
        </>
      : 
        <Redirect to="/secret" />
      }
      </Wrapper>
  )
}

Registration.propTypes = {
  endpoint: PropTypes.string.isRequired
};
export default Registration;
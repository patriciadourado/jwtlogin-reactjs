import React, {useState} from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { useAuth} from "../../auth";
import { validatePassword, validateEmail } from "../../utils/validation";
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
import { RegistrationBox } from "./styles";
import Swal from 'sweetalert2';

function Registration({ endpoint }) {
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  
  const [showEmailError, setShowEmailError] = useState(false);
  const [emailError, setEmailError] = useState('');
  
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordError, setPasswordError ] = useState('');
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [logged] = useAuth();
  const API_URL = process.env.REACT_APP_API_URL;
  const [redirect, setRedirect] = useState(false);
  
  function toggleVisibility(){
    setShowPassword(!showPassword);
  }

  const onClickSubmit = (e)=>{
    e.preventDefault()
    let opts = {
      'username': username,
      'password': password,
      'email': email
    }
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));

    //Check if a Username is empty!
    if (!opts.username.trim()){
      setUsernameError("Enter a valid username!");
      setShowUsernameError(true);
    }
    else
      setShowUsernameError(false);

    // Validate Email
    if(emailError.length > 0 )
      setShowEmailError(true);
    else
      setShowEmailError(false);

    //Validate Password
    if(passwordError.length > 0 )
      setShowPasswordError(true);
    else
      setShowPasswordError(false);
    
    if(opts.username.trim() && !emailError.length && !passwordError.length){
      fetch(API_URL+endpoint, {
        method: 'post',
        body: JSON.stringify(opts)
      }).then(response => {
          if (response.status === 201){
            Swal.fire({
              position: 'center',
              icon: 'success',
              titleText: 'A registration email has been sent to '+email+', please verify your e-mail to login!',
              showConfirmButton: false,
              timer: 9000
            })
            setRedirect(true);
          }
          else if(response.status === 303){
            setEmailError('Email already registered, try a new one!');
            setShowEmailError(true);
          }
          else{
            setUsernameError('Username already taken, try a new one!');
            setShowUsernameError(true);
          }

        }).catch(err => console.log(err))
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
            <Label>Create Your Password</Label>
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
            <Button onClick={onClickSubmit} type="submit">
              Register
            </Button>
            {redirect && <Redirect to="/" />}
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
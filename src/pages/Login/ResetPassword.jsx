import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from "../../assets/logo-flask.png";
import eye from "../../assets/eye.ico";
import { Button, Logo } from '../../components/Header/styles';
import { validateEmail, validatePassword } from '../../utils/validation';
import { IconVisibility, Label, LoginBox, LoginLabel, MyInput, Wrapper, WrapperPassword } from './styles';
import Swal from 'sweetalert2';

export function ResetPassword({ buttonLabel, endpoint }){
    const [showEmailError, setShowEmailError] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
    const [redirect, setRedirect] = useState(false);
    const API_URL = process.env.REACT_APP_API_URL;

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onClickSubmit = (e)=>{
        e.preventDefault()
        
        let opts = {
            'email': email
        }

        setEmailError(validateEmail(email));
        if(emailError.length > 0)
            setShowEmailError(true);
        else
            setShowEmailError(false);
        if(!emailError.length){
            fetch(API_URL+endpoint, {
                method: 'post',
                body: JSON.stringify(opts)
            }).then(response => {
                if (response.status === 200){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        titleText: 'An email has been sent to '+email+' with further instructions.',
                        showConfirmButton: false,
                        timer: 9000
                    })
                    setRedirect(true);
                }
                else if(response.status === 404){
                    setEmailError('Email not registered in the system!');
                    setShowEmailError(true);
                }
                else if(response.status === 403){
                    setEmailError('Account not activated, check your email first!');
                    setShowEmailError(true);
                }
            }).catch(err => console.log(err))
        }
    }
    return(
        <Wrapper>
            <Link to="/">
                <Logo logo={logo} src={logo} alt="Home" title="Home"/>
            </Link>
            <LoginLabel>{buttonLabel}</LoginLabel>
            <LoginBox reset>
                <Label>Enter your email address to continue</Label>
                <MyInput 
                    type="text" 
                    placeholder="email address" 
                    onChange={handleEmailChange}
                    value={email}
                    required
                    reset
                />
                {showEmailError &&
                    <Label error>{emailError}</Label>
                }
            <Button type="submit" onClick={onClickSubmit} reset>
              Submit
            </Button>
            {redirect && <Redirect to="/" />}
            </LoginBox>
        </Wrapper>
    );
}

export function Reset({ buttonLabel }){
    const [showMessageError1, setShowMessageError1] = useState(false);
    const [errorMessage1, setErrorMessage1] = useState('');
    const [showMessageError2, setShowMessageError2] = useState(false);
    const [errorMessage2, setErrorMessage2] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    
    function toggleVisibility1(){
        setShowPassword1(!showPassword1);
    }
    function toggleVisibility2(){
        setShowPassword2(!showPassword2);
    }
    const handlePassword1Change = (e) => {
        setPassword1(e.target.value)
    }
    const handlePassword2Change = (e) => {
        setPassword2(e.target.value)
    }

    const onClickSubmit = (e)=>{
        e.preventDefault()
        
        setErrorMessage1(validatePassword(password1));
        if(errorMessage1.length > 0){
            setShowMessageError1(true);
        }

        if(password1 !== password2){
            setErrorMessage2('Passwords do not match!');
            setShowMessageError2(true);
        }
        else{
            setErrorMessage2('');
            setShowMessageError2(false);
        }

    }
    return(
        <Wrapper>
            <Link to="/">
                <Logo logo={logo} src={logo} alt="Home" title="Home"/>
            </Link>
            <LoginLabel>{buttonLabel}</LoginLabel>
            <LoginBox>
                <Label>New Password:</Label>
                <WrapperPassword>
                    <MyInput
                        type={showPassword1 ? "text": "password"}
                        placeholder="New Password"
                        onChange={handlePassword1Change}
                        value={password1}
                        required
                    >
                    </MyInput>
                    <IconVisibility onClick={toggleVisibility1} eye={eye}></IconVisibility>
                    {showMessageError1 &&
                        <Label small>{errorMessage1}</Label>
                    }
                </WrapperPassword>
                <Label>Confirm New Password:</Label>
                <WrapperPassword>
                    <MyInput
                        type={showPassword2 ? "text": "password"}
                        placeholder="Confirm New Password"
                        onChange={handlePassword2Change}
                        value={password2}
                        required
                    >
                    </MyInput>
                    <IconVisibility onClick={toggleVisibility2} eye={eye}></IconVisibility>
                    {showMessageError2 &&
                        <Label small>{errorMessage2}</Label>
                    }
                </WrapperPassword>
                <Button type="submit" onClick={onClickSubmit} change>
                    Submit
                </Button>
            </LoginBox>
        </Wrapper>
    );
}
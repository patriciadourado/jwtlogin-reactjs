import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo-flask.png";
import { Button, Logo } from '../../components/Header/styles';
import { validateEmail } from '../../utils/validation';
import { Label, LoginBox, LoginLabel, MyInput, Wrapper } from './styles';

function ResetPassword({ buttonLabel }){
    const [showEmailError, setShowEmailError] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const onClickSubmit = (e)=>{
        e.preventDefault()
        
        setEmailError(validateEmail(email));
        if(emailError.length > 0)
            setShowEmailError(true);
        else
            setShowEmailError(false);
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
            </LoginBox>
        </Wrapper>
    );
}


export default ResetPassword;
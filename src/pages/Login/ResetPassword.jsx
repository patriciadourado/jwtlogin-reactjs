import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo-flask.png";
import { Button, Logo } from '../../components/Header/styles';
import { validateEmail } from '../../utils/validation';
import { Label, LoginBox, LoginLabel, MyInput, Wrapper } from './styles';
import Swal from 'sweetalert2';

export function ResetPassword({ buttonLabel, endpoint }){
    const [showEmailError, setShowEmailError] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
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
                }
                else if(response.status === 404){
                    setEmailError('Email not registered in the system!');
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
            </LoginBox>
        </Wrapper>
    );
}
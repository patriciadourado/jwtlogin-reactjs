import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo-flask.png";
import { Button, Logo } from '../../components/Header/styles';
import { Label, LoginBox, LoginLabel, MyInput, Wrapper } from './styles';

function ResetPassword({ buttonLabel }){
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
                    required
                    reset
                />
            <Button type="submit" reset>
              Submit
            </Button>
            </LoginBox>
        </Wrapper>
    );
}


export default ResetPassword;
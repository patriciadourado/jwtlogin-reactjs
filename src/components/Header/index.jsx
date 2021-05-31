import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../../auth";
import { MyHeader, Button, Logo } from './styles';
import logo from "../../assets/logo-flask.png";


function Header(){
  const [logged] = useAuth();
  
  return(
    <MyHeader>
      <Link to="/">
        <Logo logo={logo} title="Login"/>
      </Link>
      {!logged?
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      :
        <Redirect to="/secret" />
      }
    </MyHeader>
  )
}

export default Header;
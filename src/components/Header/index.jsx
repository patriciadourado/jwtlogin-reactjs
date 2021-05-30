import React from "react";
import { Link } from "react-router-dom";
import { logout, useAuth } from "../../auth";

import { MyHeader, Wrapper, Button } from './styles';

function Header(){
  const [logged] = useAuth();
  
  return(
    <MyHeader>
      <Wrapper>
        {!logged?
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        :
        <> 
          <Link to="/secret">
            <Button secret>Secret</Button>
          </Link>
          <Button logout onClick={() => logout()}>Logout</Button>
        </>
        }
      </Wrapper>
    </MyHeader>
  )
}

export default Header;
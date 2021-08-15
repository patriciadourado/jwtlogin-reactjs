import React from "react";
import { Redirect, Route, HashRouter } from "react-router-dom";
import { useAuth } from "./auth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import { Reset, ResetPassword } from "./pages/Login/ResetPassword";
import Registration from "./pages/Registration";
import { Finalize } from "./pages/Registration/Finalize";
import Secret from "./pages/Secret";

function Routes() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={ ()=> 
        (<Login 
          buttonLabel="Log in" 
          endpoint="/api/login"
          messageError="Please type a correct username/password!"/>
        )} 
      />
      <Route path="/registration" component={ ()=>
      (<Registration
        endpoint="/api/registration"
      />
      )}
      />
      <Route path="/reset" component={()=> 
      (<ResetPassword
          buttonLabel="Reset Password"
          endpoint="/api/reset"
          />
        )}
      /> 
      <Route path="/new_password" component={()=> 
      (<Reset
          buttonLabel="New Password"
          />
        )}
      /> 
      <Route path="/finalize" component={Finalize} />
      <PrivateRoute path="/secret" component={Secret} />
    </HashRouter>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [logged] = useAuth();

  return <Route {...rest} render={(props) => (
    logged
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
}

export default Routes;
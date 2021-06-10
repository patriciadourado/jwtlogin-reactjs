import React from "react";
import { Route, Redirect, HashRouter } from "react-router-dom";
import { useAuth } from "./auth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Secret from "./pages/Secret";

function Routes() {
  return (
    <HashRouter basename="/">
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

import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UpdateProject from './pages/UpdateProject'
import UpdateTask from './pages/UpdateTask'
import { isAuthenticated } from "./utils/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => isAuthenticated() ? <Home /> : <Login />} />
      <Route path="/signup" component={() => <SignUp />} />
      <PrivateRoute exact path="/app" component={() => <Home />} />
      <PrivateRoute path="/projects/:id/edit" component={() => <UpdateProject />} />
      <PrivateRoute path="/tasks/:id/edit" component={() => <UpdateTask />} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
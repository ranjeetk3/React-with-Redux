import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { PATH } from "./constants";
import Login from "./components/Login";
import Register from "./components/Register";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = !!JSON.parse(localStorage.getItem("login"));
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <React.Fragment>
            <Component {...props} />
          </React.Fragment>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={PATH.LOGIN} component={Login} />
          <Route exact path={PATH.REGISTER} component={Register} />
          <Redirect exact from="/*" to={PATH.LOGIN} component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;

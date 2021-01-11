import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { Context } from "./context/auth.context";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function CustomRoute({ isPrivate, ...rest }) {
  const { authenticated, loading } = useContext(Context);

  if (loading) {
    return <span>Autenticando...</span>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <CustomRoute exact path="/profile" component={Profile} />
      <CustomRoute exact path="/home" component={Home} />
    </Switch>
  );
}

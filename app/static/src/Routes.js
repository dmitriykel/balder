import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound"
import Authorization from "./Authorization";
import AppliedRoute from "./AppliedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/auth" exact component={Authorization} props={childProps} />
    <Route component={NotFound} />
  </Switch>;
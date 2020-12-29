import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomeCart from './containers/HomeCart';
import Checkout from './containers/Checkout/Checkout'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/cart">
        <HomeCart />
      </Route>
      <Route exact path="/checkout">
        <Checkout />
      </Route>

      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>

    </Switch>
  );
}
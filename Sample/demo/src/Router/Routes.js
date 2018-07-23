import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'Pages/Home';
import Dashboard from 'Pages/Dashboard';
import Admin from 'Pages/Dashboard';
import { oidcSecure } from 'AuthService';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/dashboard" component={oidcSecure(Dashboard)} />
    <Route path="/admin" component={Admin} />
    <Route path="/home" component={Home} />
  </Switch>
);

export default Routes;

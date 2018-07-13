import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'Pages/Home';
import Dashboard from 'Pages/Dashboard';
import { ProtectedRoute } from 'AuthService';
import configuration from '../configuration';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <ProtectedRoute
      path="/dashboard"
      component={Dashboard}
      isEnabled={configuration.isEnabled}
    />
    <Route path="/home" component={Home} />
  </Switch>
);

export default Routes;

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'react-context-oidc';
import Header from './Layout/Header';
import Routes from './Router';
import configuration from './configuration';

const origin = document.location.origin;

const isEnabled = configuration.isEnabled;
const authenticationConfig = configuration.configurations[1];
if (!authenticationConfig) {
  throw new Error(`Configuration not found for origin ${origin}`);
}
const App = () => (
  <div>
    <Router>
      <AuthProvider configuration={authenticationConfig.config} loggerLevel={4}>
        <Header />
        <Routes />
      </AuthProvider>
    </Router>
  </div>
);

render(<App />, document.getElementById('root'));

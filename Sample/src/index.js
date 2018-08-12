import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationProvider } from 'react-context-oidc';
import Header from './Layout/Header';
import Routes from './Router';
import configuration from './configuration';

const origin = document.location.origin;

const authenticationConfig = configuration.configurations[0];
if (!authenticationConfig) {
  throw new Error(`Configuration not found for origin ${origin}`);
}
const App = () => (
  <div>
    <Router>
      <AuthenticationProvider configuration={authenticationConfig.config} loggerLevel={4}>
        <Header />
        <Routes />
      </AuthenticationProvider>
    </Router>
  </div>
);

render(<App />, document.getElementById('root'));

# react-context-oidc API Documentation

## Provider 

A simple Way to initiate the provider for the application. Usualy done in the index.js of the application

```
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationProvider } from 'react-context-oidc';

const oidcConfiguration = {
    /// Oidc configuration
}

const App = () => (
  <div>
    <Router>
      <AuthenticationProvider configuration={oidcConfiguration} loggerLevel={4} logger={console}>
        /// your application
      </AuthenticationProvider>
    </Router>
  </div>
);
```

Arguments : 
- *settings* : oidc settings. See [oidc-client wiki](https://github.com/IdentityModel/oidc-client-js/wiki#configuration) for further information.
- *logger* : Specify a logger (see logger section). Console by default console is used.
- *loggerLevel* : Specify a level of verbose. None level by default.

React-context-oidc need the rooter (for the oidc flow redirections). So you had to wrap your application in a react router.

### Logger

React-context-oidc propose to set the logger and the level logger.

In the provider you can spécify a logger and a level logger. 

- *logger* : Like for de oidc-client package, logger is a object that support debug, info, warn and error methods that accepts a list a message to print. By default the standard console object is used.
- *loggerLevel* : verbosity of react-context-oidc Logger and oidc-client logger. You can set a number (0 : None, 1 : Error, 2 : Warn, 3: Info, 4: Debug) or using ```oidcLog.NONE```, ```oidcLog.ERROR``` , ```oidcLog.WARN``` , ```oidcLog.INFO```  or ```oidcLog.DEBUG```. By default None is selected.

## Consummer

## withOidcSecure

## withOidcUser

###


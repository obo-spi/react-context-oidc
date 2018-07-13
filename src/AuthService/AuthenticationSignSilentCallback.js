import React from 'react';
import { UserManager } from 'oidc-client';
import { oidcLog } from './loggerService';

class AuthenticationSignSilentCallback extends React.Component {
  constructor(props) {
    oidcLog.info('callback silent signin');
    new UserManager({}).signinSilentCallback();
    super(props);
  }

  render = () => <div />;
}

export default AuthenticationSignSilentCallback;

import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, branch, lifecycle, defaultProps } from 'recompose';

import { withOidcUser } from './AuthContext.container';
import {
  authenticateUser,
  getUserManager,
  oidcLog,
  isRequireAuthentication
} from '../Services';
import { Authenticating } from '../OidcComponents';

const lifecycleComponent = {
  async componentWillMount() {
    oidcLog.info('Protected route WillMount');
    const usermanager = getUserManager();
    await authenticateUser(usermanager, this.props.location)();
  }
};

const wrapAuthenticating = () => () => <Authenticating />;

export const withOidcSecure = compose(
  withOidcUser,
  withRouter,
  lifecycle(lifecycleComponent),
  branch(isRequireAuthentication(), wrapAuthenticating)
);

const Dummy = props => {
  return <Fragment>{props.children}</Fragment>;
};

const OidcSecure = props => {
  if (props.isEnabled) {
    const Secure = withOidcSecure(Dummy);
    return <Secure {...props}>{props.children}</Secure>;
  }
  return <Dummy {...props} />;
};

const withDefaultProps = defaultProps({
  isEnabled: true
});

export default withDefaultProps(OidcSecure);

import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  compose,
  branch,
  lifecycle,
  defaultProps,
  renderComponent
} from 'recompose';

import { withOidcUser } from './AuthenticationContext.container';
import {
  authenticateUser,
  getUserManager,
  oidcLog,
  isRequireAuthentication
} from '../Services';
import { Authenticating } from '../OidcComponents';

const lifecycleComponent = {
  async componentDidMount() {
    oidcLog.info('Protected component mounted');
    const usermanager = getUserManager();
    await authenticateUser(usermanager, this.props.location)();
  }
};

const wrapAuthenticating = () => () => <Authenticating />;

const Dummy = props => {
  return <Fragment>{props.children}</Fragment>;
};

const withDefaultProps = defaultProps({
  isEnabled: true
});

export const withOidcSecure = compose(
  withDefaultProps,
  branch(props => !props.isEnabled, renderComponent(Dummy)),
  withOidcUser,
  withRouter,
  lifecycle(lifecycleComponent),
  branch(isRequireAuthentication(), wrapAuthenticating)
);

const OidcSecure = props => {
  const Secure = withOidcSecure(Dummy);
  return <Secure {...props}>{props.children}</Secure>;
};

export default OidcSecure;

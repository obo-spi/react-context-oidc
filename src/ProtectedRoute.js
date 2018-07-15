import React, { Fragment } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { compose, branch, lifecycle } from 'recompose';
import { AuthConsumer } from './AuthContext';
import { getUserManager } from './authenticationService';
import { isRequireAuthentication, authenticateUser } from './authenticate';
import Authenticating from './Authenticating';

const lifecycleComponent = {
  async componentWillMount() {
    const usermanager = getUserManager();
    await authenticateUser(usermanager, this.props.location)();
  }
};

const wrapAuthenticating = WrappedComponent => props => <Authenticating />;

export const enhance = compose(
  withRouter,
  lifecycle(lifecycleComponent),
  branch(isRequireAuthentication(), wrapAuthenticating)
);

const Dummy = props => {
  return <Fragment>{props.children}</Fragment>;
};

const OidcSecure = props => {
  if (props.isEnabled) {
    const Secure = enhance(Dummy);
    return <Secure {...props}>{props.children}</Secure>;
  }
  return <Dummy {...props} />;
};

const ProtectedRoute = ({ component: Component, isEnabled, ...rest }) => (
  <AuthConsumer>
    {({ oidcUser }) => (
      <OidcSecure user={oidcUser} isEnabled={isEnabled}>
        <Route
          render={props =>
            oidcUser ? <Component {...props} /> : <Redirect to="/" />
          }
          {...rest}
        />
      </OidcSecure>
    )}
  </AuthConsumer>
);

export default ProtectedRoute;

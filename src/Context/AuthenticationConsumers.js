import React, { useContext, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router-dom';

import {
  authenticateUser,
  getUserManager,
  oidcLog,
  isRequireAuthentication,
  withServices
} from '../Services';
import { Authenticating } from '../OidcComponents';
import { AuthenticationContext } from './AuthenticationContextCreator';

//for tests
export const useOidcSecureWithService = (
  authenticateUser,
  getUserManager,
  location
) => {
  const { isEnabled, oidcUser, isLogout } = useContext(AuthenticationContext);
  useEffect(() => {
    if (isEnabled && !isLogout) {
      oidcLog.info('Protected component mounted');
      const usermanager = getUserManager();
      authenticateUser(usermanager, location)();
    }
  }, [location, isEnabled, isLogout, authenticateUser, getUserManager]);

  return oidcUser;
};

export const withOidcSecurewithRouter = WrappedComponent => ({
  location,
  authenticateUser,
  getUserManager,
  ...otherProps
}) => {
  const oidcUser = useOidcSecureWithService(
    authenticateUser,
    getUserManager,
    location
  );
  const requiredAuth = useMemo(() => isRequireAuthentication(oidcUser, false), [
    oidcUser
  ]);
  if (requiredAuth) {
    return <Authenticating />;
  }
  return <WrappedComponent {...otherProps} />;
};

const OidcSecure = ({ children, location }) => {
  useOidcSecure(location);
  return <div>{children}</div>;
};

// for usage

export const withOidcSecure = WrappedComponent =>
  withRouter(
    withServices(withOidcSecurewithRouter(WrappedComponent), {
      authenticateUser,
      getUserManager
    })
  );

export const useOidcSecure = location =>
  useOidcSecureWithService(authenticateUser, getUserManager, location);

export const withOidcUser = Component => props => {
  const { oidcUser } = useContext(AuthenticationContext);
  const { children } = props;
  return (
    <Component {...props} oidcUser={oidcUser}>
      {children}
    </Component>
  );
};
export default withRouter(OidcSecure);

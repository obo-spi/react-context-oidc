import React from 'react';
import PropTypes from 'prop-types';
import { AuthenticationContext } from './AuthenticationContextCreator';
import { OidcRoutes } from '../Routes';

const propTypes = {
  notAuthenticated: PropTypes.node,
  notAuthorized: PropTypes.node,
  authenticating: PropTypes.node,
  isLoading: PropTypes.bool.isRequired,
  isEnabled: PropTypes.bool,
  // eslint-disable-next-line
  oidcUser: PropTypes.object, //TODO : récuperer le proptypes depuis OIDC client ?
  error: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isLogout: PropTypes.bool,
};

const defaultProps = {
  notAuthenticated: null,
  notAuthorized: null,
  authenticating: null,
  isEnabled: true,
  isLogout: false,
};

const AuthenticationProviderComponent = ({
  isLoading,
  isEnabled,
  oidcUser,
  error,
  login,
  logout,
  notAuthenticated,
  notAuthorized,
  authenticating,
  children,
  isLogout,
}) => (
  <AuthenticationContext.Provider
    value={{
      isLoading,
      oidcUser,
      error,
      login,
      logout,
      authenticating,
      isEnabled,
      isLogout,
    }}
  >
    <OidcRoutes
      notAuthenticated={notAuthenticated}
      notAuthorized={notAuthorized}
    >
      {children}
    </OidcRoutes>
  </AuthenticationContext.Provider>
);

AuthenticationProviderComponent.propTypes = propTypes;
AuthenticationProviderComponent.defaultProps = defaultProps;

export default AuthenticationProviderComponent;

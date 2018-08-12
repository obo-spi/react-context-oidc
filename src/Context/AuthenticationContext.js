import React from 'react';
import PropTypes from 'prop-types';
import { AuthenticationContext } from './AuthenticationContextCreator';
import { OidcRoutes } from '../Routes';

const propTypes = {
  notAuthentified: PropTypes.node,
  notAuthorized: PropTypes.node,
  isEnabled: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  oidcUser: PropTypes.object, //TODO : récuperer le proptypes depuis OIDC client ?
  error: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const defaultProps = {
  notAuthentified: null,
  notAuthorized: null,
  isEnabled: true
};

const AuthenticationProviderComponent = props => (
  <AuthenticationContext.Provider
    value={{
      isLoading: props.isLoading,
      oidcUser: props.oidcUser,
      error: props.error,
      login: props.login,
      logout: props.logout
    }}
  >
    <OidcRoutes
      notAuthentified={props.notAuthentified}
      notAuthorized={props.notAuthorized}
    >
      {props.children}
    </OidcRoutes>
  </AuthenticationContext.Provider>
);

AuthenticationProviderComponent.propTypes = propTypes;
AuthenticationProviderComponent.defaultProps = defaultProps;

export default AuthenticationProviderComponent;

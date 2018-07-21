import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContextCreator';
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

const AuthProviderComponent = props => (
  <AuthContext.Provider
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
  </AuthContext.Provider>
);

AuthProviderComponent.propTypes = propTypes;
AuthProviderComponent.defaultProps = defaultProps;

export default AuthProviderComponent;

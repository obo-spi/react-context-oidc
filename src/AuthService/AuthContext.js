import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import OidcRoutes from './OidcRoutes';
import authenticationService from './authenticationService';
import { authenticateUser } from './authenticate';
import { setLogger, oidcLog } from './loggerService';

const AuthContext = React.createContext();

const propTypes = {
  notAuthentified: PropTypes.any,
  notAuthorized: PropTypes.any,
  configuration: PropTypes.any.isRequired,
  isEnabled: PropTypes.bool,
  location: PropTypes.any,
  loggerLevel: PropTypes.number,
  logger: PropTypes.any
};

const defaultProps = {
  notAuthentified: null,
  notAuthorized: null,
  isEnabled: true,
  loggerLevel: 0,
  logger: console
};

class AuthProviderComponent extends React.Component {
  state = {
    oidcUser: undefined,
    userManager: authenticationService(this.props.configuration),
    isLoading: false,
    error: ''
  };

  constructor(props) {
    super(props);
    setLogger(props.loggerLevel, props.logger);
    this.onUserLoaded = this.onUserLoaded.bind(this);
    this.onError = this.onError.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state.userManager.events.addUserLoaded(
      this.onUserLoaded('addUserLoaded')
    );
    this.state.userManager.events.addSilentRenewError(this.onError);

    this.state.userManager.events.addUserUnloaded(
      this.onUserUnloaded('addUserUnloaded')
    );
    this.state.userManager.events.addUserSignedOut(
      this.onUserUnloaded('addUserSignedOut')
    );
  }

  componentDidMount() {
    if (this.props.configuration) {
      this.setState({
        ...this.state,
        isLoading: true
      });

      return this.state.userManager
        .getUser()
        .then(this.onUserLoaded)
        .catch(this.onError);
    }
    return Promise.reject();
  }

  onUserLoaded = reason => user => {
    oidcLog.info(`User Loaded from ${reason}`);
    this.setState({
      ...this.state,
      oidcUser: user,
      isLoading: false
    });
  };

  onUserUnloaded = reason => async () => {
    oidcLog.info(`User unLoaded from ${reason}`);
    this.setState({
      ...this.state,
      oidcUser: null,
      isLoading: false
    });
  };

  async login() {
    this.setState({
      ...this.state,
      oidcUser: null,
      isLoading: true
    });
    await authenticateUser(
      this.state.userManager,
      this.props.location,
      localStorage
    )();
  }

  logout() {
    this.setState({
      ...this.state,
      oidcUser: null,
      isLoading: true
    });
    this.state.userManager
      .removeUser()
      .then(this.onUserUnloaded)
      .catch(this.onError);
  }

  onError(error) {
    oidcLog.error(`Error in loadUser() function: ${error.message}`);
    this.setState({
      ...this.state,
      error: error.message,
      isLoading: false
    });
  }

  render() {
    if (!this.props.isEnabled) {
      return <Fragment>{this.props.children}</Fragment>;
    }
    return (
      <AuthContext.Provider
        value={{
          isLoading: this.state.isLoading,
          oidcUser: this.state.oidcUser,
          error: this.state.error,
          login: this.login,
          logout: this.logout
        }}
      >
        <OidcRoutes
          notAuthentified={this.props.notAuthentified}
          notAuthorized={this.props.notAuthorized}
        >
          {this.props.children}
        </OidcRoutes>
      </AuthContext.Provider>
    );
  }
}

AuthProviderComponent.propTypes = propTypes;
AuthProviderComponent.defaultProps = defaultProps;
const AuthProvider = withRouter(AuthProviderComponent);
const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };

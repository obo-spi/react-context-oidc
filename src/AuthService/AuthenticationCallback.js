import * as React from 'react';
import CallbackComponent from './CallbackComponent';
import { withRouter } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { getUserManager } from './authenticationService';
import { localStorageKeyUrlBeforeSignin } from './authenticate';
import { oidcLog } from './loggerService';

const AuthenticationCallback = ({ history, userManager }) => {
  const successCallback = () => {
    const urlBeforeSignin = localStorage.getItem(
      localStorageKeyUrlBeforeSignin
    );
    oidcLog.info('Successfull Callback');
    if (urlBeforeSignin) {
      history.push(urlBeforeSignin);
    } else {
      // tslint:disable-next-line:no-console
      oidcLog.error('urlBeforeSignin null or undefined');
    }
  };

  const errorCallback = error => {
    const message = error.message;
    // tslint:disable-next-line:no-console
    oidcLog.error(
      'There was an error handling the token callback: ' + error.message
    );
    history.push(`/authentication/not-authentified?message=${message}`);
  };

  return (
    <CallbackComponent
      userManager={userManager}
      errorCallback={errorCallback}
      successCallback={successCallback}
    >
      <p>Authentification en cours vous allez être redirigé.</p>
    </CallbackComponent>
  );
};

const wrapUserManager = () => {
  return { userManager: getUserManager() };
};

const enhance = compose(
  withRouter,
  withProps(wrapUserManager)
);

export default enhance(AuthenticationCallback);

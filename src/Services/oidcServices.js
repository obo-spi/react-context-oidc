import { oidcLog } from './loggerService';

export const isRequireAuthentication = () => props => {
  return props.isForce || !props.oidcUser;
};

export const authenticateUser = (userManager, location) => async (
  isForce = false
) => {
  if (!userManager || !userManager.getUser) {
    return;
  }
  const oidcUser = await userManager.getUser();
  if (isRequireAuthentication()({ oidcUser, isForce })) {
    oidcLog.info('authenticate user...');
    await userManager.signinRedirect({ data: { location: location.pathname } });
  }
};

export const logoutUser = async userManager => {
  if (!userManager || !userManager.getUser) {
    return;
  }
  const oidcUser = await userManager.getUser();
  if (oidcUser) {
    oidcLog.info('Logout user...');
    await userManager.signoutRedirect();
  }
};

export const trySilentAuthenticateFunction = authenticateUser => (
  userManager,
  location
) => async () => {
  try {
    await userManager.signinSilent();
  } catch (exception) {
    oidcLog.error('signinSilent failed', exception);
    authenticateUser(userManager, location)(true);
  }
};

export const trySilentAuthenticate = trySilentAuthenticateFunction(
  authenticateUser
);

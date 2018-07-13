export const localStorageKeyUrlBeforeSignin = 'url_before_signing';

export const isRequireAuthentication = () => props => {
  return props.isForce || !props.user || props.user.expired;
};

export const authenticateUser = (userManager, location, localStorage) => async (
  isForce = false
) => {
  if (!userManager || !userManager.getUser) {
    return;
  }
  const user = await userManager.getUser();
  if (isRequireAuthentication()({ user, isForce })) {
    const currentUrl = location.pathname + location.search;
    localStorage.setItem(localStorageKeyUrlBeforeSignin, currentUrl);
    await userManager.signinRedirect();
  }
};

export const trySilentAuthenticate = (
  userManager,
  location,
  localStorage
) => async () => {
  try {
    await userManager.signinSilent();
  } catch (exception) {
    if (console.error) {
      console.error('signinSilent failed', exception);
    }
    authenticateUser(userManager, location, localStorage)(true);
  }
};

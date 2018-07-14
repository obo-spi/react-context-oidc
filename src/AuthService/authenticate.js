export const isRequireAuthentication = () => props => {
  return props.isForce || !props.user || props.user.expired;
};

export const authenticateUser = (userManager, location) => async (
  isForce = false
) => {
  if (!userManager || !userManager.getUser) {
    return;
  }
  const user = await userManager.getUser();
  if (isRequireAuthentication()({ user, isForce })) {
    await userManager.signinRedirect({ data: { location } });
  }
};

export const trySilentAuthenticate = (userManager, location) => async () => {
  try {
    await userManager.signinSilent();
  } catch (exception) {
    if (console.error) {
      console.error('signinSilent failed', exception);
    }
    authenticateUser(userManager, location)(true);
  }
};

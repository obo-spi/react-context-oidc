import { UserManager } from 'oidc-client';

let userManager;

export const getUserManager = () => {
  return userManager;
};

export const authenticationService = config => {
  if (userManager) {
    return userManager;
  }
  userManager = new UserManager(config);
  return userManager;
};

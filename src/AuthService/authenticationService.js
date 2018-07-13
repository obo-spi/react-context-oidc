import { UserManager } from 'oidc-client';

let userManager;

export const getUserManager = () => {
  return userManager;
};

const authenticationService = config => {
  if (userManager) {
    return userManager;
  }
  userManager = new UserManager(config);
  return userManager;
};

export default authenticationService;

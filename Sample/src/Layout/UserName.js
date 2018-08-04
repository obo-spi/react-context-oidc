import React from 'react';
import { withUser } from '../AuthService/authenticate';

export const UserName = ({ oidcUser }) => {
  console.log(oidcUser);
  return <span>Paul</span>;
};

export default withUser(UserName);

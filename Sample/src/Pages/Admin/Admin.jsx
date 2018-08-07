import React from 'react';
import { withOidcUser, OidcSecure } from 'react-context-oidc';

const Admin = ({ oidcUser }) => (
  <OidcSecure isEnabled={false}>
    <h1>Admin</h1>
    <p>Protected Admin</p>
    {oidcUser && <p>Bonjour {oidcUser.profile.name}</p>}
  </OidcSecure>
);

export default withOidcUser(Admin);

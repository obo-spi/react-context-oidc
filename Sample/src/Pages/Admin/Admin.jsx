import React from 'react';
import { OidcSecure } from 'react-context-oidc';

const Dashboard = () => (
  <OidcSecure>
    <h1>Admin</h1>
    <p>Protected Admin</p>
  </OidcSecure>
);

export default Dashboard;

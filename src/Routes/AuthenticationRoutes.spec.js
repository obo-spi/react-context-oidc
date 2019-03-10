import * as React from 'react';
import { render } from 'react-testing-library';
import Component from './AuthenticationRoutes';

jest.mock('../OidcComponents', () => ({
  NotAuthenticated: 'NotAuthenticated',
  NotAuthorized: 'NotAuthorized',
}));
jest.mock('../Callback', () => ({
  Callback: 'Callback',
  SilentCallback: 'SilentCallback',
}));
jest.mock('react-router', () => ({
  Route: 'Route',
  Switch: 'Switch',
}));

describe('Authenticating test suite', () => {
  it('renders correctly', () => {
    const matchMock = {
      url: 'http://url.com',
    };
    const ComponentRend = Component();
    const { asFragment } = render(<ComponentRend match={matchMock} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

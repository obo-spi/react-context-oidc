import * as React from 'react';
import { render } from 'react-testing-library';
import Component from './OidcRoutes';
import { StaticRouter } from 'react-router';

jest.mock('./AuthenticationRoutes', () =>
  jest.fn(() => 'AuthenticationRoutes'),
);
jest.mock('react-router-dom', () => ({
  Route: 'Route',
  Switch: 'Switch',
}));

describe('Authenticating test suite', () => {
  it('renders correctly', () => {
    const props = {
      children: 'http://url.com',
      notAuthenticated: 'notAuthenticated',
      notAuthorized: 'notAuthorized',
    };

    const { asFragment } = render(
      <StaticRouter>
        <Component {...props} />
      </StaticRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

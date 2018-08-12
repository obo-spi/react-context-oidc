import Component from './SilentCallback.component';
import * as oidc from 'oidc-client';

jest.mock('oidc-client');
jest.mock('../Services');

describe('SilentCallbackcomponent test', () => {
  const userManagerMock = {
    signinSilentCallback: jest.fn()
  };
  it('Should call signent callback when contruct', () => {
    oidc.UserManager.mockImplementation(() => userManagerMock);
    const comp = new Component();
    expect(userManagerMock.signinSilentCallback).toBeCalled();
  });
});

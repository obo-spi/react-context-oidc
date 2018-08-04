import * as authenticate from './oidcServices';

jest.mock('./loggerService');

describe('authenticate testing', () => {
  const userMock = {};
  const authenticateUserMock = jest.fn(() => jest.fn());
  const userManagerMock = {
    getUser: jest.fn(() => userMock),
    signinRedirect: jest.fn(),
    signinSilent: jest.fn()
  };

  const locationMock = {
    pathname: '/pathname'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('authenticateUser should do nothing if userManager is undefined', () => {
    authenticate.authenticateUser(undefined, locationMock)();
    expect(userManagerMock.getUser).not.toBeCalled();
  });

  it('authenticateUser should get user with authManager setted', async () => {
    await authenticate.authenticateUser(userManagerMock, locationMock)();
    expect(userManagerMock.getUser).toBeCalled();
    expect(userManagerMock.signinRedirect).not.toBeCalled();
  });

  it('authenticateUser should not call signinredirect with a user ', async () => {
    await authenticate.authenticateUser(userManagerMock, locationMock)();
    expect(userManagerMock.getUser).toBeCalled();
    expect(userManagerMock.signinRedirect).not.toBeCalled();
  });

  it('authenticateUser should call signin redirect with force to true', async () => {
    await authenticate.authenticateUser(userManagerMock, locationMock)(true);
    expect(userManagerMock.getUser).toBeCalled();
    expect(userManagerMock.signinRedirect).toBeCalledWith({
      data: { location: '/pathname' }
    });
  });

  it('trySilentAuthenticate Should call signinSilent', async () => {
    const trySilentAuthenticate = authenticate.trySilentAuthenticateFunction(
      authenticateUserMock
    );
    await trySilentAuthenticate(userManagerMock, locationMock)();
    expect(userManagerMock.signinSilent).toBeCalled();
  });

  it('authenticateUser Should call signinSilent', async () => {
    const userManagerThrow = {
      ...userManagerMock,
      signinSilent: jest.fn(() => {
        throw new Error();
      })
    };
    const trySilentAuthenticate = authenticate.trySilentAuthenticateFunction(
      authenticateUserMock
    );
    await trySilentAuthenticate(userManagerThrow, locationMock)();
    expect(authenticateUserMock).toBeCalled();
  });
});

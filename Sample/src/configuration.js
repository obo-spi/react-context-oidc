const configuration = {
  isEnabled: true,
  configurations: [
    {
      config: {
        client_id: 'kbyuFDidLLm280LIwVFiazOqjO3ty8KH',
        redirect_uri: 'http://localhost:3000/authentication/callback',
        response_type: 'id_token token',
        scope: 'openid profile email phone address',
        authority: 'https://samples.auth0.com',
        silent_redirect_uri:
          'http://localhost:3000/authentication/silent_callback',
        automaticSilentRenew: true,
        loadUserInfo: true,
        triggerAuthFlow: true
      }
    },
    {
      config: {
        client_id: 'implicit',
        redirect_uri: 'http://localhost:3000/authentication/callback',
        response_type: 'id_token token',
        post_logout_redirect_uri: 'http://localhost:3000/',
        scope: 'openid profile email',
        authority: 'https://demo.identityserver.io',
        silent_redirect_uri:
          'http://localhost:3000/authentication/silent_callback',
        automaticSilentRenew: true,
        loadUserInfo: true,
        triggerAuthFlow: true
      }
    }
  ]
};

export default configuration;

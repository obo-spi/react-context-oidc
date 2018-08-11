# react-context-oidc

[![Build Status](https://travis-ci.com/oyouf/react-context-oidc.svg?branch=master)](https://travis-ci.org/oyouf/react-context-oidc)

Oidc Integration for react using Context API. Inspired by the [Redux OIDC Package](https://github.com/maxmantz/redux-oidc) this package wrap the [Oidc client](https://github.com/IdentityModel/oidc-client-js) in order to easily use it in Reduxless React application.

### Description

This package handles oidc-client package in a react application. It enables react application to connect with an external login, and protect the fully application or just few routes or component. The packages proposes the following features :
- *AuthenticationProvider* : Api Context Provider to initate the package (usually in index.js)
- *AuthenticationConsummer* : to manipulate some oidc objects and functions
- *OidcSecure* : A component to protect anothers components.
- *withOidcSecure* : A Hoc to protect routes or components
- *Helpers* to manage oidc client 

### Installation

`npm install -save react-context-oidc`

#### Peer dependencies

This package wraps [oidc-client-js](https://github.com/IdentityModel/oidc-client-js)
Oidc-client is required to use the package : 

`npm install --save oidc-client`

To work with API Context, react>=16.3 and react-router are required.

#### Documentation

- [API Documentation](docs/API.md)
- [Sample application documentation](docs/SAMPLE.md)

### What's next ? 
In the next releases we will propose : 
- Possibility to protect fully application or just some parts of it
- Type definition for typescript using.


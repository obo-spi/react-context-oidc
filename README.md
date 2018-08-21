# react-context-oidc

[![Build Status](https://travis-ci.com/oyouf/react-context-oidc.svg?branch=master)](https://travis-ci.org/oyouf/react-context-oidc)

Oidc Integration for react using Context API. Inspired by the [Redux OIDC Package](https://github.com/maxmantz/redux-oidc) this package wrap the [Oidc client](https://github.com/IdentityModel/oidc-client-js) in order to easily use it in Reduxless React application.

### Description

This package handles oidc-client package in a react application. It enables react applications to connect with an external login, and protect the fully application or just few routes or component. The packages proposes the following features :

- _AuthenticationProvider_ : Api Context Provider to initate the package (usually in index.js)
- _AuthenticationConsummer_ : to manipulate some oidc objects and functions
- _OidcSecure_ : A component to protect anothers components.
- _withOidcSecure_ : A Hoc to protect routes or components
- _Helpers_ to manage oidc client

### Installation

`npm install -save react-context-oidc`

#### Peer dependencies

This package wraps [oidc-client-js](https://github.com/IdentityModel/oidc-client-js)
Oidc-client is required to use the package :

`npm install --save oidc-client`

To work with API Context, react>=16.3 and react-router are required.

#### Documentation

- [API Documentation](doc/API.md)
- [Sample application documentation](doc/SAMPLE.md)

### What's next ?

In the next releases we will propose :

- Type definition for typescript using.

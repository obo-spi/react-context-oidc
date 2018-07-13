import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticationRoutes from './AuthenticationRoutes';
import PropTypes from 'prop-types';

const propTypes = {
  notAuthentified: PropTypes.any,
  notAuthorized: PropTypes.any,
};

const defaultProps = {
 notAuthentified: null,
 notAuthorized: null,
};

const OidcRoutes = (props) => {
    return (
      <Switch>
        <Route path="/authentication" component={AuthenticationRoutes(props.notAuthentified, props.notAuthorized)} />
        <Route render={() => props.children} />
      </Switch>
    );
}

OidcRoutes.propTypes = propTypes;
OidcRoutes.defaultProps = defaultProps;

export default OidcRoutes;

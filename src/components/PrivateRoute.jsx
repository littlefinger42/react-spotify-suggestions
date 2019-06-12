import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {
	getSpotifyDisplayName,
  } from "../store/selectors/index";

const mapStateToProps = state => ({
	auth: isAuthenticated(state)
  });

const isAuthenticated = (state) => {
	return getSpotifyDisplayName(state) ? true : false
}

const PrivateRoute = ({ component: Component, auth: auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default connect(mapStateToProps)(PrivateRoute);
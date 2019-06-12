import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "../store/store";
import {
  setUserAccessToken,
  setUserSpotifyDataStarted,
  setUserSpotifyDataFinished,
  setUserSpotifyDataError
} from "../store/actions/index";

import Home from "../containers/Home.jsx";
import Login from "./Login.jsx";

import urlUtils from "../utils/urlUtils";
import spotifyUtils from "../utils/spotifyUtils";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.abortController = new AbortController();
  }

  isLoggedIn() {
    if (store.getState().user.accessToken) {
      return true;
    }

    if (urlUtils.getUrlParam("\\?", "error") === "access_denied") {
      store.dispatch(setUserAccessToken(""));
      return false;
    }

    const accessTokenParam = urlUtils.getUrlParam("#", "access_token");
    if (!accessTokenParam) {
      //TODO: Check for accessToken in local storage and check to see if it is expired
      return false;
    }

    let accessTokenSplit = accessTokenParam.split("&");
    store.dispatch(setUserAccessToken(accessTokenSplit[0]));

    store.dispatch(setUserSpotifyDataStarted());
    spotifyUtils
      .getSpotifyUserData(accessTokenSplit[0], this.abortController)
      .then(result => {
        if (result.error) {
          store.dispatch(setUserSpotifyDataError(result));
          return false;
        } else {
          store.dispatch(setUserSpotifyDataFinished(result));
          return true;
        }
      });

  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (this.isLoggedIn() ? <Home /> : <Login />)}
          />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;

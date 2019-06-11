import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "../store/store"
import { updateUser } from "../store/actions/index"

import Home from "./Home.jsx";
import Login from "./Login.jsx";

import urlUtils from "../utils/urlUtils";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  isLoggedIn() {
    if (store.getState().user.access_token) {
      return true;
    }

    if (urlUtils.getUrlParam("\\?", "error") === "access_denied") {
      store.dispatch(updateUser({ access_token: "", isLoginAttempted: true }));
      return false;
    }

    const accessTokenParam = urlUtils.getUrlParam("#", "access_token");
    if (!accessTokenParam) {
      //TODO: Check for accessToken in local storage and check to see if it is expired
      return false;
    }

    let accessToken = accessTokenParam.split("&");
    store.dispatch(updateUser({access_token: accessToken[0], isLoginAttempted: true }))
    return true;
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => (
            this.isLoggedIn() ? ( <Home/> ) : ( <Login/> )
          )} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;

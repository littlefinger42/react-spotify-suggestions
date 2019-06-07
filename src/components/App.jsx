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
    this.state = {
      user: {
        access_token: "",
        isLoginAttempted: false
      }
    };

    store.subscribe(() => {
      this.setState({ user: store.getState().user});
    });
  }

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (this.state.user.access_token) {
      return true;
    }

    if (urlUtils.getUrlParam("\\?", "error") === "access_denied") {
      store.dispatch(updateUser({ access_token: "", isLoginAttempted: true }));
      return false;
    }

    const accessTokenParam = urlUtils.getUrlParam("#", "access_token");
    if (!accessTokenParam) {
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
            this.state.user.access_token ? ( <Home/> ) : ( <Login/> )
          )} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;

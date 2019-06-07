import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home.jsx";
import Login from "./Login.jsx";

import urlUtils from "../utils/urlUtils";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      login_attempted: false
    };
  }

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (urlUtils.getUrlParam("\\?", "error") === "access_denied") {
      this.setState({ login_attempted: true });
      return false;
    }

    const accessTokenParam = urlUtils.getUrlParam("#", "access_token");
    if (!accessTokenParam) {
      return false;
    }

    let accessToken = accessTokenParam.split("&");
    this.setState({ access_token: accessToken, login_attempted: true });
    return true;
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;

import React from "react";
import Button from "./Button.jsx";

import urlUtils from "../utils/urlUtils";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      login_attempted: false
    };
  }

  render() {
    return <Button label="Test" handleClick={this.loginButtonClicked} />;
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

  loginButtonClicked() {
    // TODO: Feedback if user is already logged in
    if (!this.state.access_token)
      window.location.href =
        "https://accounts.spotify.com/authorize?client_id=6a055beb5e304ad19bf4dc36a07e3fcd&response_type=token&redirect_uri=http://localhost:8080/";
  }
}

export default App;

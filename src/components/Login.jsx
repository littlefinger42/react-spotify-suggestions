import React from "react";
import store from "../store/store";

import Button from "./Button.jsx";
import Alert from "./Alert.jsx";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        access_token: null,
        isLoginAttempted: false
      }
    };

    store.subscribe(() => {
      this.setState({ user: store.getState().user });
    });
  }

  loginButtonClicked() {
    window.location.href =
      "https://accounts.spotify.com/authorize?client_id=6a055beb5e304ad19bf4dc36a07e3fcd&response_type=token&redirect_uri=http://localhost:8080/";
  }

  render() {
    let alert;
    if (this.state.user.isLoginAttempted) {
      alert = <Alert>Failed login attempt.</Alert>
    }
    return (
      <div>
        {alert}
        <Button handleClick={this.loginButtonClicked}>Authorize Spotify</Button>
      </div>
    );
  }
}

export default Login;

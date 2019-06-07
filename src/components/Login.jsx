import React from "react";
import Button from "./Button.jsx";

class Login extends React.Component {
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

  loginButtonClicked() {
    // TODO: Feedback if user is already logged in
    if (!this.state.access_token)
      window.location.href =
        "https://accounts.spotify.com/authorize?client_id=6a055beb5e304ad19bf4dc36a07e3fcd&response_type=token&redirect_uri=http://localhost:8080/";
  }
}

export default Login;

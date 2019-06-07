import React from "react";
import Button from "./Button.jsx";
import store from "../store/store";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        access_token: null,
        login_attempted: false
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
    return <Button label="Test" handleClick={this.loginButtonClicked} />;
  }
}

export default Login;

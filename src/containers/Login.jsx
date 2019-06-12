import React from "react";
import { connect } from "react-redux";

import Button from "../components/Button.jsx";
import Alert from "../components/Alert.jsx";

import {
  getSpotifyDisplayName,
  getUserAccessToken
} from "../store/selectors/index";
import {
  setUserAccessToken,
  setUserSpotifyDataStarted,
  setUserSpotifyDataFinished,
  setUserSpotifyDataError
} from "../store/actions/index";

import urlUtils from "../utils/urlUtils";
import spotifyUtils from "../utils/spotifyUtils";

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state),
      spotify: {
        display_name: getSpotifyDisplayName(state)
      }
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserAccessToken: prop => dispatch(setUserAccessToken(prop)),
    setUserSpotifyDataStarted: () => dispatch(setUserSpotifyDataStarted()),
    setUserSpotifyDataError: prop => dispatch(setUserSpotifyDataError(prop)),
    setUserSpotifyDataFinished: prop =>
      dispatch(setUserSpotifyDataFinished(prop))
  };
};

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.abortController = new AbortController();
    this.state = {
      isLoading: false,
      isLoginFailed: false,
    };
  }

  componentDidMount() {
    const accessToken = this.getAccessToken();
    this.props.setUserAccessToken(accessToken);

    if (accessToken && !this.props.user.spotify.displayName) {
      this.props.setUserSpotifyDataStarted();
      spotifyUtils
        .getSpotifyUserData(accessToken, this.abortController)
        .then(result => {
          if (result.error) {
            this.props.setUserSpotifyDataError(result);
            this.setState({ isLoading: false });
          } else {
            this.props.setUserSpotifyDataFinished(result);
            this.setState({ isLoading: false });
            this.props.history.push("/home");
          }
        });
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  getAccessToken() {
    this.setState({ isLoading: true });

    if (this.props.user.accessToken) {
      this.setState({ isLoading: false });
      return this.props.user.accessToken;
    }

    const accessTokenParam = urlUtils.getUrlParam("#", "access_token");
    if (!accessTokenParam) {
      if (urlUtils.getUrlParam("\\?", "error") === "access_denied") {
        this.setState({ isLoginFailed: true });
      }
      //TODO: Check for accessToken in local storage and check to see if it is expired
      this.setState({ isLoading: false });
      return false;
    }

    this.setState({ isLoading: false });
    return accessTokenParam.split("&")[0];
  }

  render() {
    let alert;
    if (this.state.isLoginFailed) {
      alert = <Alert>Failed login attempt.</Alert>;
    }
    return (
      <div>
        {alert}
        <Button handleClick={spotifyUtils.redirectToSpotifyLoginPage}>
          Authorize Spotify
        </Button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

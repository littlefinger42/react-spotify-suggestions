import React from "react";
import { connect } from "react-redux";

import {
  getSpotifyDisplayName,
  getUserAccessToken,
  getRecommendationParams
} from "../store/selectors/index";
import {
  setUserAccessToken,
  setUserSpotifyDataStarted,
  setUserSpotifyDataFinished,
  setUserSpotifyDataError
} from "../store/actions/index";

import urlUtils from "../utils/urlUtils";
import spotifyUtils from "../utils/spotifyUtils";

import Main from "../components/Main.jsx";
import Button from "../components/Button.jsx";
import Alert from "../components/Alert.jsx";

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state),
      spotify: {
        display_name: getSpotifyDisplayName(state)
      }
    },
    recommendationParams: getRecommendationParams(state)
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
      isLoading: false, //TODO: Use loading state
      isLoginFailed: false
    };
  }

  componentDidMount() {
    const accessToken = this.getAccessToken();
    this.props.setUserAccessToken(accessToken);

    if (accessToken && !this.props.user.spotify.displayName) {
      this.props.setUserSpotifyDataStarted();
      spotifyUtils
        .getSpotifyUserData(accessToken, this.abortController)
        .then(response => {
          if (!response.display_name) {
            this.props.setUserSpotifyDataError(response);
            this.setState({ isLoading: false, isLoginFailed: true });
          } else {
            this.props.setUserSpotifyDataFinished(response);
            this.setState({ isLoading: false, isLoginFailed: true });
            this.props.history.push("/home");
          }
        });
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  /**
   * Returns the accessToken from the URL, otherwise false
   * @returns {string|boolean}
   */
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

  doNothing = event => {
    console.log("nothing", event);
  };

  render() {
    let alert;
    if (this.state.isLoginFailed) {
      alert = <Alert>Failed login attempt.</Alert>;
    }

    return (
      <Main>
        {alert}
        <p>
          Spotify Suggestions Generator doesn't store any of your information.
        </p>
        <br></br>
        <p>
          The purpose of Spotify Suggestions Generator is to utilise the spotify
          API to give the user more control over their recommendations than they
          can in the desktop or mobile client.
        </p>
        <br></br>
        <Button handleClick={spotifyUtils.redirectToSpotifyLoginPage}>
          Authorize Spotify
        </Button>
      </Main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

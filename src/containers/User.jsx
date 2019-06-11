import React from "react";
import { connect } from "react-redux";
import store from "../store/store";
import {
  setUserSpotifyDataStarted,
  setUserSpotifyDataFinished,
  setUserSpotifyDataError
} from "../store/actions/index";
import {
  getSpotifyDisplayName,
  getUserAccessToken
} from "../store/selectors/index";

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state),
      spotify: {
        user_name: getSpotifyDisplayName(state)
      }
    }
  };
};

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.abortController = new AbortController();
  }

  componentDidMount() {
    if (!this.props.user.accessToken) {
      //TODO: Redirect back to login
    }

    store.dispatch(setUserSpotifyDataStarted());
    fetch("https://api.spotify.com/v1/me/", {
      signal: this.abortController.signal,
      headers: {
        Authorization: `Bearer ${this.props.user.accessToken}`
      }
    })
      .then(res => res.json())
      .then(
        result => {
          store.dispatch(setUserSpotifyDataFinished(result));
        },
        error => {
          store.dispatch(setUserSpotifyDataError());
        }
      );
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    return <span>Logged in as {this.props.user.spotify.user_name}</span>;
  }
}

export default connect(mapStateToProps)(UserContainer);

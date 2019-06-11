import React from "react";
import { connect } from "react-redux";
import store from "../store/store";
import {
  setUserSpotifyDataStarted,
  setUserSpotifyDataFinished,
  setUserSpotifyDataError
} from "../store/actions/index";
import {
  getUserAccessToken,
  getSpotifyDisplayName,
  getSpotifyDisplayImgUrl
} from "../store/selectors/index";

import User from "../components/User.jsx";

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state),
      spotify: {
        display_name: getSpotifyDisplayName(state),
        img_url: getSpotifyDisplayImgUrl(state)
      }
    }
  };
};

class HomeContainer extends React.Component {
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
    return (
      <User
        username={this.props.user.spotify.display_name}
        imgUrl={this.props.user.spotify.img_url}
      />
    );
  }
}

export default connect(mapStateToProps)(HomeContainer);

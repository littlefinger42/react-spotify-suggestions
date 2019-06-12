import React from "react";
import { connect } from "react-redux";
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
  }

  componentDidMount() {
    if (!this.props.user.spotify.display_name) {
      //TODO: Redirect back to login
    }
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

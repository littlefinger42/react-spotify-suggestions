import React from "react";
import { connect } from "react-redux";
import {
  getUserAccessToken,
  getSpotifyDisplayName,
  getSpotifyDisplayImgUrl
} from "../store/selectors/index";
import { updateTopTracks } from "../store/actions/index";

import spotifyUtils from "../utils/spotifyUtils";

import User from "../components/User.jsx";
import Button from "../components/Button.jsx";
import TrackList from "../components/TrackList.jsx";

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

const mapDispatchToProps = dispatch => {
  return {
    updateTopTracks: prop => dispatch(updateTopTracks(prop))
  };
};

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      selectedTrackIds: []
    };
  }

  getTopTracks() {
    //TODO: add abort handler
    spotifyUtils
      .getSpotifyTopTracks(this.props.user.accessToken)
      .then(result => {
        result = result.map(track => {
          track.selected = false;
          return track;
        });
        this.props.updateTopTracks(result);
        this.setState({ tracks: result });
      });
  }

  getSelectedTracksIds() {
    return this.state.tracks.filter(track => track.selected === true).map(track => track.id)
  }

  getRecommendations() {
    //TODO: add abort handler
    spotifyUtils
      .getSpotifyRecommendations(this.props.user.accessToken, this.getSelectedTracksIds())
      .then(result => {
        console.log(result);
      });
  }

  trackClicked(item, event) {
    let index;
    const clickedTrack = this.state.tracks.find((track, i) => {
      index = i;
      return track.id === item.props.id;
    });
    
    if (!clickedTrack) return false;

    clickedTrack.selected = event.target.checked;

    this.setState({ tracks: [...this.state.tracks.slice(0, index), clickedTrack, ...this.state.tracks.slice(index + 1)] });
  }

  render() {
    return (
      <div>
        <User
          username={this.props.user.spotify.display_name}
          imgUrl={this.props.user.spotify.img_url}
        />
        <Button handleClick={this.getTopTracks.bind(this)}>
          Load top tracks
        </Button>
        <Button handleClick={this.getRecommendations.bind(this)}>
          Load recommendations tracks
        </Button>
        <TrackList
          tracks={this.state.tracks}
          handleClick={this.trackClicked.bind(this)}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);

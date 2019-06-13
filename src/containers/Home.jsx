import React from "react";
import { connect } from "react-redux";

import {
  getUserAccessToken,
  getSpotifyDisplayName,
  getSpotifyDisplayImgUrl
} from "../store/selectors/index";
import { updateTopTracks } from "../store/actions/index";

import spotifyUtils from "../utils/spotifyUtils";

import Main from "../components/Main.jsx";
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
      tracks: [[]],
      selectedTracks: []
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
        this.setState({ tracks: [result] });
      });
  }

  getRecommendations() {
    //TODO: add abort handler
    spotifyUtils
      .getSpotifyRecommendations(
        this.props.user.accessToken,
        this.state.selectedTracks
      )
      .then(result => {
        this.setState({ tracks: [...this.state.tracks, result] });
      });
  }

  trackClicked(item, event) {
    if (event.target.checked) {
      this.setState({
        selectedTracks: [...this.state.selectedTracks, item.props.id]
      });
    } else {
      const newList = this.state.selectedTracks.filter(
        trackId => trackId !== item.props.id
      );
      this.setState({ selectedTracks: newList });
    }
  }

  render() {
    return (
      <Main>
        <User
          username={this.props.user.spotify.display_name}
          imgUrl={this.props.user.spotify.img_url}
        />
        <Button
          disabled={this.state.tracks[0].length !== 0}
          handleClick={this.getTopTracks.bind(this)}
        >
          Load tops tracks
        </Button>
        <Button
          disabled={this.state.selectedTracks.length < 1}
          handleClick={this.getRecommendations.bind(this)}
        >
          Suggest tracks
        </Button>
        {this.state.tracks.map((trackList, index) => {
          return (
            <TrackList
              key={index}
              id={index}
              tracks={trackList}
              trackClicked={this.trackClicked.bind(this)}
            />
          );
        })}
      </Main>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);

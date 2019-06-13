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
    this.abortController = new AbortController();
    this.state = {
      tracks: [[]],
      selectedTracks: []
    };
  }

  /**
   * Uses spotify utils to fetch top tracks then sets them to the state and the store
   */
  getTopTracks = () => {
    spotifyUtils
      .getSpotifyTopTracks(this.props.user.accessToken, this.abortController)
      .then(result => {
        result = result.map(track => {
          track.selected = false;
          return track;
        });
        this.props.updateTopTracks(result);
        this.setState({ tracks: [result] });
      });
  }

  /**
   * Uses spotify utils to fetch recommendations based on selected tracks in the state, then sets them to the state
   */
  getRecommendations = () => {
    spotifyUtils
      .getSpotifyRecommendations(
        this.props.user.accessToken,
        this.state.selectedTracks,
        this.abortController
      )
      .then(result => {
        this.setState({ tracks: [...this.state.tracks, result] });
      });
  }

  /**
   * CLick handler for track
   * @param {Object} item 
   * @param {*} event 
   */
  trackClicked = (item, event) => {
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

  componentWillUnmount() {
    this.abortController.abort();
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
          handleClick={this.getTopTracks}
        >
          Load tops tracks
        </Button>
        <Button
          disabled={this.state.selectedTracks.length < 1}
          handleClick={this.getRecommendations}
        >
          Suggest tracks
        </Button>
        {this.state.tracks.map((trackList, index) => {
          return (
            <TrackList
              key={index}
              id={index}
              tracks={trackList}
              trackClicked={this.trackClicked}
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

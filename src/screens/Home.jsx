import React from "react";
import { connect } from "react-redux";

import {
  getUserAccessToken,
  getSpotifyUserId,
  getTouchedRecommendationParams,
  getSelectedTracks,
  getRecommendedTracks
} from "../store/selectors/index";
import { updateTopTracks } from "../store/actions/index";

import spotifyUtils from "../utils/spotifyUtils";

import Main from "../components/Main.jsx";
import InputContainer from "../containers/InputContainer.jsx";
import OutputContainer from "../containers/OutputContainer.jsx";
import Button from "../components/Button.jsx";
import Toolbar from "../components/Toolbar.jsx";
import Alert from "../components/Alert.jsx";
import FlexContainer from "../components/FlexContainer.jsx";

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state),
      spotify: {
        id: getSpotifyUserId(state)
      },
      touchedRecommendationParams: getTouchedRecommendationParams(state)
    },
    selectedTracks: getSelectedTracks(state),
    recommendedTracks: getRecommendedTracks(state)
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
      isLoading: false,
      tracksExported: false,
      tracksExportable: false,
      tracksExportedPlaylistId: null
    };
  }

  /**
   * Creates and fills a new spotify playlist with selected tracks
   */
  exportPlaylist = () => {
    this.setState({ isLoading: true });
    spotifyUtils
      .createAndFillSpotifyPlaylist(
        this.props.user.accessToken,
        this.props.user.spotify.id,
        this.props.selectedTracks,
        this.abortController
      )
      .then(response => {
        if (response.error) {
          alert(response.error); //TODO: add better error messages
          this.setState({ isLoading: false });
          return false;
        }

        this.setState({
          tracksExportable: false,
          tracksExported: true,
          isLoading: false,
          tracksExportedPlaylistId: response.playlistId
        });
      });
  };
  /**
   * Adds to previously created playlist
   */
  addToPlaylist = () => {
    this.setState({ isLoading: true });
    spotifyUtils
      .addTracksToSpotifyPlaylist(
        this.props.user.accessToken,
        this.state.tracksExportedPlaylistId,
        this.props.selectedTracks,
        this.abortController
      )
      .then(response => {
        if (response.error) {
          alert(response.error); //TODO: add better error messages
          this.setState({ isLoading: false });
          return false;
        }

        this.setState({
          tracksExportable: false,
          tracksExported: true,
          isLoading: false
        });
      });
  };

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    let alert;
    if (this.state.tracksExported && !this.state.tracksExportable) {
      alert = <Alert>Track exported</Alert>;
    }
    console.log("recommended tracks", this.props.recommendedTracks);
    return (
      <Main>
        <Toolbar>
          <Button
            disabled={
              this.props.selectedTracks.length < 1 || this.state.isLoading
            }
            handleClick={this.exportPlaylist}
          >
            Export Playlist
          </Button>
          <Button
            disabled={
              !this.props.selectedTracks ||
              this.state.isLoading ||
              !this.state.tracksExported
            }
            handleClick={this.addToPlaylist}
          >
            Add to existing Playlist
          </Button>
        </Toolbar>
        <FlexContainer>
          <InputContainer
            tracksSelected={this.props.selectedTracks.length}
            touchedParams={this.props.touchedRecommendationParams}
          />
          {this.props.recommendedTracks &&
            this.props.recommendedTracks.length > 0 && (
              <OutputContainer tracks={this.props.recommendedTracks} />
            )}
        </FlexContainer>
        {alert}
      </Main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

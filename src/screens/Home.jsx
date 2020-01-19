import React from "react";
import { connect } from "react-redux";

import {
  getUserAccessToken,
  getSpotifyUserId,
  getTouchedRecommendationParams,
  getSelectedTracks
} from "../store/selectors/index";
import { updateTopTracks } from "../store/actions/index";

import spotifyUtils from "../utils/spotifyUtils";

import Main from "../components/Main.jsx";
import InputContainer from "../containers/InputContainer.jsx";
import TrackList from "../containers/TrackList.jsx";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Toolbar from "../components/Toolbar.jsx";
import Pagination from "../components/Pagination.jsx";
import Alert from "../components/Alert.jsx";

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state),
      spotify: {
        id: getSpotifyUserId(state)
      },
      touchedRecommendationParams: getTouchedRecommendationParams(state)
    },
    selectedTracks: getSelectedTracks(state)
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
      tracks: [],
      selectedTrackList: "",
      tracksExported: false,
      tracksExportable: false,
      tracksExportedPlaylistId: null
    };
  }

  /**
   * Uses spotify utils to fetch recommendations based on selected tracks in the state, then sets them to the state
   */
  getRecommendations = () => {
    const { user } = this.props;

    if (this.props.selectedTracks.length === 0) {
      alert("Select some tracks as seeds first!");
      return false;
    }

    this.setState({ isLoading: true });
    spotifyUtils
      .getSpotifyRecommendations(
        user.accessToken,
        this.props.selectedTracks,
        user.touchedRecommendationParams,
        this.abortController
      )
      .then(response => {
        if (response.error) {
          alert(response.error); //TODO: add better error messages
          this.setState({ isLoading: false });
          return false;
        }

        this.setState({
          tracks: [
            ...this.state.tracks,
            { id: this.state.tracks.length, tracks: response }
          ],
          isLoading: false,
          selectedTrackList: this.state.tracks.length
        });
      });
  };

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

  /**
   * Switches current selected list of tracks
   * @param {*} event
   * @param {string} id
   */
  switchList = (event, id) => {
    this.setState({ selectedTrackList: id });
  };

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    let alert;
    if (this.state.tracksExported && !this.state.tracksExportable) {
      alert = <Alert>Track exported</Alert>;
    }

    return (
      <Main>
        <InputContainer
          tracksSelected={this.props.selectedTracks.length}
          touchedParams={this.props.touchedRecommendationParams}
        />
        {alert}
        <Toolbar>
          <Button
            disabled={
              this.props.selectedTracks.length < 1 || this.state.isLoading
            }
            handleClick={this.getRecommendations}
          >
            Suggest tracks
          </Button>
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

        {this.state.tracks && this.state.tracks.length > 0 && (
          <Card>
            <div style={{ width: "100%" }}>
              <Pagination
                handleClick={this.switchList}
                selectedPageId={this.state.selectedTrackList}
                pages={this.state.tracks}
              />
              {this.state.tracks.map((trackList, index) => {
                return (
                  <TrackList
                    className={
                      trackList.id === this.state.selectedTrackList
                        ? ""
                        : "hidden"
                    }
                    key={index}
                    id={index}
                    tracks={trackList.tracks}
                    trackClicked={this.trackClicked}
                  />
                );
              })}
            </div>
          </Card>
        )}
      </Main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

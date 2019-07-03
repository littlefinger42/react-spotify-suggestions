import React from "react";
import { connect } from "react-redux";

import {
  getUserAccessToken,
  getSpotifyDisplayName,
  getSpotifyDisplayImgUrl,
  getSpotifyUserId
} from "../store/selectors/index";
import { updateTopTracks } from "../store/actions/index";

import spotifyUtils from "../utils/spotifyUtils";

import Main from "../components/Main.jsx";
import UserInfo from "../components/UserInfo.jsx";
import Button from "../components/Button.jsx";
import TrackList from "../components/TrackList.jsx";
import Toolbar from "../components/Toolbar.jsx";
import Pagination from "../components/Pagination.jsx";
import Alert from "../components/Alert.jsx";

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state),
      spotify: {
        display_name: getSpotifyDisplayName(state),
        img_url: getSpotifyDisplayImgUrl(state),
        id: getSpotifyUserId(state)
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
      isLoading: false,
      tracks: [{ id: "", tracks: [] }],
      selectedTracks: [],
      selectedTrackList: "",
      tracksExported: false,
      tracksExportable: false,
      tracksExportedPlaylistId: null
    };
  }

  componentDidMount() {
    this.getTopTracks();
  }

  /**
   * Uses spotify utils to fetch top tracks then sets them to the state and the store
   */
  getTopTracks = () => {
    this.setState({ isLoading: true });
    spotifyUtils
      .getSpotifyTopTracks(this.props.user.accessToken, this.abortController)
      .then(response => {
        if (response.error) {
          alert(response.error); //TODO: add better error messages
          this.setState({ isLoading: false });
          return false;
        }
        response = response.map(track => {
          track.selected = false;
          return track;
        });
        this.props.updateTopTracks(response);
        this.setState({
          tracks: [{ id: "Top", tracks: response }],
          isLoading: false,
          selectedTrackList: "Top"
        });
      });
  };

  /**
   * Uses spotify utils to fetch recommendations based on selected tracks in the state, then sets them to the state
   */
  getRecommendations = () => {
    if (this.state.selectedTracks.length === 0) {
      alert("Select some tracks as seeds first!");
      return false;
    }

    this.setState({ isLoading: true });
    spotifyUtils
      .getSpotifyRecommendations(
        this.props.user.accessToken,
        this.state.selectedTracks,
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
        this.state.selectedTracks,
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
    spotifyUtils.addTracksToSpotifyPlaylist(
      this.props.user.accessToken,
      this.state.tracksExportedPlaylistId,
      this.state.selectedTracks,
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
   * Click handler for track
   * @param {Object} item
   * @param {Boolean} active
   * @param {*} event
   */
  trackClicked = (item, active) => {
    if (active) {
      this.setState({
        selectedTracks: [...this.state.selectedTracks, item.props.id],
        tracksExportable: true
      });
    } else {
      const newList = this.state.selectedTracks.filter(
        trackId => trackId !== item.props.id
      );
      this.setState({ selectedTracks: newList, tracksExportable: true });
    }
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
        <UserInfo
          username={this.props.user.spotify.display_name}
          imgUrl={this.props.user.spotify.img_url}
          tracksSelected={this.state.selectedTracks.length}
        />
        {alert}
        <Toolbar>
          <Button
            disabled={
              this.state.selectedTracks.length < 1 || this.state.isLoading
            }
            handleClick={this.getRecommendations}
          >
            Suggest tracks
          </Button>
          <Button
            disabled={!this.state.tracksExportable || this.state.isLoading}
            handleClick={this.exportPlaylist}
          >
            Export Playlist
          </Button>
          <Button
            disabled={
              !this.state.tracksExportable ||
              this.state.isLoading ||
              !this.state.tracksExported
            }
            handleClick={this.addToPlaylist}
          >
            Add to existing Playlist
          </Button>
        </Toolbar>
        <Pagination
          handleClick={this.switchList}
          selectedPageId={this.state.selectedTrackList}
          pages={this.state.tracks}
        />
        {this.state.tracks.map((trackList, index) => {
          return (
            <TrackList
              className={
                trackList.id === this.state.selectedTrackList ? "" : "hidden"
              }
              key={index}
              id={index}
              tracks={trackList.tracks}
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

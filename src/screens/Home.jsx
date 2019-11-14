import React from "react";
import { connect } from "react-redux";

import {
  getUserAccessToken,
  getSpotifyUserId,
  getTouchedRecommendationParams
} from "../store/selectors/index";
import { updateTopTracks } from "../store/actions/index";

import spotifyUtils from "../utils/spotifyUtils";

import Main from "../components/Main.jsx";
import UserInfo from "../containers/UserInfo.jsx";
import TopTracks from "../containers/TopTracks.jsx";
import TrackList from "../containers/TrackList.jsx";
import SearchTracks from "../containers/SearchTracks.jsx";
import RecommendationsSelector from "../containers/RecommendationsSelector.jsx";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import FlexContainer from "../components/FlexContainer.jsx";
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
      tracks: [],
      selectedTracks: [],
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

    if (this.state.selectedTracks.length === 0) {
      alert("Select some tracks as seeds first!");
      return false;
    }

    this.setState({ isLoading: true });
    spotifyUtils
      .getSpotifyRecommendations(
        user.accessToken,
        this.state.selectedTracks,
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
    spotifyUtils
      .addTracksToSpotifyPlaylist(
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
          tracksSelected={this.state.selectedTracks.length}
          touchedParams={this.props.touchedRecommendationParams}
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
          <RecommendationsSelector />
        </Toolbar>

        <FlexContainer>
          <div>
            <Card>
              <TopTracks trackClicked={this.trackClicked} />
            </Card>
          </div>
          <div>
            <Card>
              <SearchTracks trackClicked={this.trackClicked} />
            </Card>
          </div>
        </FlexContainer>

        {this.state.tracks && (
          <Card>
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
          </Card>
        )}
      </Main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

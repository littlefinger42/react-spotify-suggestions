import React from "react";
import styled from "styled-components";
import { style } from "../config";
import { connect } from "react-redux";

import {
  getUserAccessToken,
  getSpotifyUserId,
  getSelectedTracks
} from "../store/selectors/index";

import spotifyUtils from "../utils/spotifyUtils";

import TrackList from "./TrackList.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Alert from "../components/Alert.jsx";
import Pagination from "../components/Pagination.jsx";

const OutputContainerCountainer = styled(Card)`
  padding: ${style.sizeSm};
  flex: 1;
`;
const OutputItem = styled.div`
  flex: 1;
  margin-bottom: ${style.sizeSm};
  &:last-child {
    margin-bottom: 0;
  }
`;
const OutputContainerHeader = styled.div`
  height: 50px;
  padding-bottom: ${style.sizeSm};
  display: flex;
  justify-content: space-between;
`;

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state),
      spotify: {
        id: getSpotifyUserId(state)
      }
    },
    selectedTracks: getSelectedTracks(state)
  };
};

class OutputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.abortController = new AbortController();
    this.state = {
      isLoading: false,
      selectedTrackList: this.props.tracks.length - 1,
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

  switchList = (event, id) => {
    this.setState({ selectedTrackList: id });
  };

  render() {
    let alert;
    if (this.state.tracksExported && !this.state.tracksExportable) {
      alert = <Alert>Track exported</Alert>;
    }
    return (
      <OutputContainerCountainer>
        <OutputContainerHeader>
          <span className="h2">Output</span>
          <div>
            <Pagination
              handleClick={this.switchList}
              selectedPageId={this.state.selectedTrackList}
              pages={this.props.tracks}
            />
          </div>
        </OutputContainerHeader>

        <OutputItem>
          <div style={{ width: "100%" }}>
            {this.props.tracks.map((trackList, index) => {
              return (
                <TrackList
                  className={
                    index === this.state.selectedTrackList ? "" : "hidden"
                  }
                  key={index}
                  id={index}
                  tracks={trackList}
                />
              );
            })}
          </div>
        </OutputItem>
        <OutputItem>
          <Button
            disabled={
              this.props.selectedTracks.length < 1 || this.state.isLoading
            }
            handleClick={this.exportPlaylist}
          >
            Export selected tracks to a spotify playlist
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
        </OutputItem>
      </OutputContainerCountainer>
    );
  }
}

export default connect(mapStateToProps)(OutputContainer);

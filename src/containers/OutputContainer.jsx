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
  margin-bottom: ${style.sizeSm};
  display: flex;
  justify-content: space-between;
`;
const OutputContainerTitle = styled.h2`
  font-size: 14px;
  @media ${style.device.tablet} {
    font-size: 16px;
  }
  @media ${style.device.laptop} {
    font-size: 18px;
  }
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
      alert: {
        type: "",
        message: ""
      },
      selectedTrackList: this.props.tracks.length - 1,
      tracksExported: false,
      tracksExportable: false,
      tracksExportedPlaylistId: null
    };
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tracks.length - 1 !== this.state.selectedTrackList) {
      this.setState({ selectedTrackList: nextProps.tracks.length - 1 });
    }
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
          this.setState({
            isLoading: false,
            alert: {
              type: "danger",
              message: response.error
            }
          });
          return false;
        }

        this.setState({
          tracksExportable: false,
          tracksExported: true,
          alert: {
            type: "success",
            message: "Tracks exported!"
          },
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
          this.setState({
            isLoading: false,
            alert: {
              type: "danger",
              message: respomse.error
            }
          });
          return false;
        }

        this.setState({
          tracksExportable: false,
          tracksExported: true,
          alert: {
            type: "success",
            message: "Tracks added to playlist!"
          },
          isLoading: false
        });
      });
  };

  switchList = (event, id) => {
    this.setState({ selectedTrackList: id });
  };
  render() {
    return (
      <OutputContainerCountainer>
        <OutputContainerHeader>
          <OutputContainerTitle>Output</OutputContainerTitle>
          <div>
            <Pagination
              handleClick={this.switchList}
              selectedPageId={this.state.selectedTrackList}
              pages={this.props.tracks}
            />
          </div>
        </OutputContainerHeader>
        {this.state.alert.type && this.state.alert.message && (
          <OutputItem>
            <Alert type={this.state.alert.type}>
              {this.state.alert.message}
            </Alert>
          </OutputItem>
        )}
        <OutputItem>
          <div style={{ width: "100%" }}>
            {this.props.tracks.map((trackList, index) => (
              <TrackList
                className={
                  index === this.state.selectedTrackList ? "" : "hidden"
                }
                key={index}
                id={index}
                tracks={trackList}
              />
            ))}
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

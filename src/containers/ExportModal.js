import React, { useState } from "react";
import { connect } from "react-redux";
import spotifyUtils from "../utils/spotifyUtils";

import {
  getUserAccessToken,
  getSpotifyDisplayName,
  getSpotifyDisplayImgUrl,
  getSpotifyUserId,
  getSelectedTracks
} from "../store/selectors/index";

import Alert from "../components/Alert.jsx";
import Button from "../components/Button.jsx";
import Controls from "../components/Controls";
import Modal from "../components/Modal";
import TextInput from "../components/TextInput.jsx";

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state),
      spotify: {
        display_name: getSpotifyDisplayName(state),
        img_url: getSpotifyDisplayImgUrl(state),
        id: getSpotifyUserId(state)
      }
    },
    selectedTracks: getSelectedTracks(state)
  };
};

function ExportModal(props) {
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [tracksExportable, setTracksExportable] = useState(true);
  const [tracksExported, setTracksExported] = useState(null);
  const [playlistName, setPlaylistName] = useState("");
  /**
   * Creates and fills a new spotify playlist with selected tracks
   */
  const exportPlaylist = async () => {
    setLoading(true);
    const abortController = new AbortController();
    const response = await spotifyUtils.createAndFillSpotifyPlaylist(
      props.user.accessToken,
      props.user.spotify.id,
      {
        seeds: props.selectedTracks,
        name: playlistName || generateTitleName()
      },
      abortController
    );

    if (response.error) {
      setAlert({
        type: "danger",
        message: response.error
      });
    } else {
      setTracksExportable(false);
      setTracksExported(response.playlistId);
      setAlert({
        type: "success",
        message: `Tracks exported to new playlist ${playlistName}!`
      });
    }
    setLoading(false);
  };

  function generateTitleName() {
    const date = new Date();
    return `Generated Playlist ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  /**
   * Adds to previously created playlist
   */
  const addToPlaylist = async () => {
    setLoading(true);
    const response = spotifyUtils.addTracksToSpotifyPlaylist(
      props.user.accessToken,
      tracksExportedPlaylistId,
      props.selectedTracks,
      this.abortController
    );

    if (response.error) {
      setAlert({
        type: "danger",
        message: response.error
      });
    } else {
      setTracksExportable(false);
      setAlert({
        type: "success",
        message: "Tracks added to playlist!"
      });
    }
    setLoading(false);
  };
  return (
    <Modal title="Export..." onClose={props.onClose}>
      {alert && alert.message && <Alert {...alert} />}
      <Controls>
        <TextInput onChange={value => setPlaylistName(value)}></TextInput>
        <Button
          disabled={props.selectedTracks.length < 1 || isLoading}
          handleClick={exportPlaylist}
        >
          Create Playlist
        </Button>
      </Controls>
      <hr />

      {/* <Button
        disabled={!props.selectedTracks || isLoading || !tracksExported}
        handleClick={addToPlaylist}
      >
        Add to last created laylist
      </Button> */}
    </Modal>
  );
}

export default connect(mapStateToProps)(ExportModal);

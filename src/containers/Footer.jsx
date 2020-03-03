import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { style } from "../config";
import spotifyUtils from "../utils/spotifyUtils";

import {
  getUserAccessToken,
  getSpotifyDisplayName,
  getSpotifyDisplayImgUrl,
  getSpotifyUserId,
  getSelectedTracks
} from "../store/selectors/index";

import Button from "../components/Button.jsx";

const FooterStyled = styled.footer`
  width: 100%;
  height: ${style.sizeLg};
  background-color: ${style.blackLevelOne};
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FooterItem = styled.div`
  padding: 16px;
`;

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

function Footer(props) {
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [tracksExportable, setTracksExportable] = useState(true);
  const [tracksExported, setTracksExported] = useState(null);
  /**
   * Creates and fills a new spotify playlist with selected tracks
   */
  const exportPlaylist = async () => {
    setLoading(true);
    const abortController = new AbortController();
    const response = await spotifyUtils.createAndFillSpotifyPlaylist(
      props.user.accessToken,
      props.user.spotify.id,
      props.selectedTracks,
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
        message: "Tracks exported!"
      });
    }
    setLoading(false);
  };

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
      alert(response.error); //TODO: add better error messages
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

  const { user } = props;
  return (
    <FooterStyled>
      <FooterItem>
        <Button
          disabled={props.selectedTracks.length < 1 || isLoading}
          handleClick={exportPlaylist}
        >
          Export selected tracks to a spotify playlist
        </Button>
      </FooterItem>
      <FooterItem>
        <Button
          disabled={!props.selectedTracks || isLoading || !tracksExported}
          handleClick={addToPlaylist}
        >
          Add to existing Playlist
        </Button>
      </FooterItem>
    </FooterStyled>
  );
}

export default connect(mapStateToProps)(Footer);

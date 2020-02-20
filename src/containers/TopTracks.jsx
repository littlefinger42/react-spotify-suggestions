import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import spotifyUtils from "../utils/spotifyUtils";

import { getUserAccessToken, getTopTracks } from "../store/selectors/index";
import { updateTopTracks } from "../store/actions/index";

import Alert from "../components/Alert.jsx";
import Spinner from "../components/Spinner.jsx";
import TrackList from "./TrackList.jsx";

const TopTracksList = styled(TrackList)`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
`;

const TopTracksContainer = styled.div`
  flex: 1;
`;

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state)
    },
    tracks: getTopTracks(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTopTracks: prop => dispatch(updateTopTracks(prop))
  };
};

function TopTracks(props) {
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const abortController = new AbortController();

  useEffect(() => {
    async function fetchTopTracks() {
      setLoading(true);
      const tracks = await doFetchTopTracks();
      props.updateTopTracks(tracks);
      setLoading(false);
    }
    if (props.tracks.length < 1) fetchTopTracks();

    return () => {
      abortController.abort();
    };
  }, []);

  const doFetchTopTracks = () =>
    spotifyUtils
      .getSpotifyTopTracks(props.user.accessToken, abortController)
      .then(response => {
        if (response.error) {
          setAlert({ type: "danger", message: response.error });
          return [];
        }
        return response;
      });

  return (
    <TopTracksContainer>
      {alert.type && alert.message && (
        <Alert type={alert.type}>{alert.message}</Alert>
      )}
      {isLoading && <Spinner />}
      {props.tracks.length > 0 && (
        <TopTracksList className="" tracks={props.tracks} />
      )}
    </TopTracksContainer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTracks);

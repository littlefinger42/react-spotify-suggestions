import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import spotifyUtils from "../utils/spotifyUtils";

import { getUserAccessToken } from "../store/selectors/index";

import Alert from "../components/Alert.jsx";
import Spinner from "../components/Spinner.jsx";
import TrackList from "./TrackList.jsx";

const RecentTracksList = styled(TrackList)`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
`;

const RecentTracksContainer = styled.div`
  flex: 1;
`;

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state)
    }
  };
};

function RecentTracks(props) {
  const [isLoading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const abortController = new AbortController();

  useEffect(() => {
    async function fetchRecentTracks() {
      setLoading(true);
      await setTracks(await doFetchRecentTracks());
      setLoading(false);
    }
    fetchRecentTracks();

    return () => {
      abortController.abort();
    };
  }, []);

  const doFetchRecentTracks = () =>
    spotifyUtils
      .getSpotifyRecentTracks(props.user.accessToken, abortController)
      .then(response => {
        if (response.error) {
          setAlert({ type: "danger", message: response.error });
          return [];
        }
        return response;
      });

  return (
    <RecentTracksContainer>
      {alert && alert.message && <Alert {...alert} />}
      {isLoading && <Spinner />}
      {tracks && <RecentTracksList className="" tracks={tracks} />}
    </RecentTracksContainer>
  );
}

export default connect(mapStateToProps)(RecentTracks);

import React from "react";
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

class RecentTracks extends React.Component {
  constructor(props) {
    super(props);
    this.abortController = new AbortController();
    this.state = {
      isLoading: false,
      tracks: [],
      alert: {
        type: "",
        message: ""
      }
    };
    this.parameterRange = React.createRef();
  }

  componentDidMount() {
    this.getTopTracks();
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  /**
   * Uses spotify utils to fetch top tracks then sets them to the state and the store
   */
  getTopTracks = () => {
    this.setState({ isLoading: true });
    spotifyUtils
      .getSpotifyRecentTracks(this.props.user.accessToken, this.abortController)
      .then(response => {
        if (response.error) {
          this.setState({
            isLoading: false,
            alert: { type: "danger", message: response.error }
          });
          return false;
        }
        response = response.map(track => {
          track.selected = false;
          return track;
        });
        this.setState({
          tracks: response,
          isLoading: false
        });
      });
  };

  render() {
    const { tracks, isLoading, alert } = this.state;

    return (
      <RecentTracksContainer>
        {alert.type && alert.message && (
          <Alert type={alert.type}>{alert.message}</Alert>
        )}
        {isLoading && <Spinner />}
        {tracks && <RecentTracksList className="" tracks={tracks} />}
      </RecentTracksContainer>
    );
  }
}

export default connect(mapStateToProps)(RecentTracks);

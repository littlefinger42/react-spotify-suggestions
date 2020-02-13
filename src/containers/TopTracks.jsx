import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import spotifyUtils from "../utils/spotifyUtils";

import { getUserAccessToken, getTopTracks } from "../store/selectors/index";
import { updateTopTracks } from "../store/actions/index";

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

class TopTracks extends React.Component {
  constructor(props) {
    super(props);
    this.abortController = new AbortController();
    this.state = {
      isLoading: false
    };
    this.parameterRange = React.createRef();
  }

  componentDidMount() {
    if (this.props.tracks.length < 1) this.getTopTracks();
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
      .getSpotifyTopTracks(this.props.user.accessToken, this.abortController)
      .then(response => {
        if (response.error) {
          alert(response.error); //TODO: add better error messages
          this.setState({ isLoading: false });
          return false;
        }
        this.props.updateTopTracks(response);
        this.setState({
          isLoading: false
        });
      });
  };

  render() {
    const { isLoading } = this.state;
    const { tracks } = this.props;

    return (
      <TopTracksContainer>
        {isLoading && <Spinner />}
        {tracks && <TopTracksList className="" tracks={tracks} />}
      </TopTracksContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTracks);

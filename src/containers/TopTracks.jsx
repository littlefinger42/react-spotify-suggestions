import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import spotifyUtils from "../utils/spotifyUtils";

import { getUserAccessToken } from "../store/selectors/index";
import { updateTopTracks } from "../store/actions/index";

import TrackList from "./TrackList.jsx";

const TopTracksList = styled(TrackList)`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
`;

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state)
    }
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
      isLoading: false,
      tracks: []
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
          tracks: response,
          isLoading: false
        });
      });
  };

  render() {
    const { tracks } = this.state;
    if (tracks)
      return (
        <TopTracksList
          className=""
          tracks={tracks}
          trackClicked={this.props.trackClicked}
        />
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTracks);

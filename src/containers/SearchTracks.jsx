import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { style } from "../config";

import spotifyUtils from "../utils/spotifyUtils";

import { getUserAccessToken } from "../store/selectors/index";

import TextInput from "../components/TextInput.jsx";
import TrackList from "./TrackList.jsx";

const SearchTracksContainer = styled.div`
  flex: 1;
`;

const SearchTracksHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${style.sizeSm};
`;

const SearchTracksTracksList = styled(TrackList)`
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

class SearchTracks extends React.Component {
  constructor(props) {
    super(props);
    this.abortController = new AbortController();
    this.state = {
      searchQuery: "",
      isLoading: false,
      tracks: []
    };
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  /**
   * Uses spotify utils to fetch top tracks then sets them to the state and the store
   */
  searchTracks = () => {
    this.setState({ isLoading: true });
    spotifyUtils
      .searchSpotifyTracks(
        this.props.user.accessToken,
        this.abortController,
        this.state.searchQuery
      )
      .then(response => {
        if (response.error) {
          alert(response.error); //TODO: add better error messages
          this.setState({ isLoading: false });
          return false;
        }
        this.setState({
          tracks: response,
          isLoading: false
        });
      });
  };

  onSearchQueryChange = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { tracks, searchQuery } = this.state;
    return (
      <SearchTracksContainer>
        <SearchTracksHeader>
          <span>Search</span>
          <TextInput
            onChange={this.onSearchQueryChange}
            onEnterDown={this.searchTracks}
            value={searchQuery}
          />
        </SearchTracksHeader>
        {tracks && (
          <SearchTracksTracksList
            className=""
            tracks={tracks}
            trackClicked={this.props.trackClicked}
          />
        )}
      </SearchTracksContainer>
    );
  }
}

export default connect(mapStateToProps)(SearchTracks);
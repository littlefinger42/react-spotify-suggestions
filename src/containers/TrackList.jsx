import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { style } from "../config";

import { getSelectedTrackIds } from "../store/selectors/index";

import Track from "../containers/Track.jsx";
import TrackMin from "../containers/TrackMin.jsx";

const StyledList = styled.ul`
  max-height: 400px;
  overflow-y: auto;
`;

const mapStateToProps = state => {
  return {
    selectedTrackIds: getSelectedTrackIds(state)
  };
};

class TrackList extends React.Component {
  render() {
    const { min, tracks, className, selectedTrackIds } = this.props;
    return (
      <StyledList className={className}>
        {tracks.map((track, index) => {
          const selected = selectedTrackIds.find(
            selectedTrack => selectedTrack === track.id
          );

          return min ? (
            <TrackMin key={track.id + index} {...track} selected={selected} />
          ) : (
            <Track key={track.id + index} {...track} selected={selected} />
          );
        })}
      </StyledList>
    );
  }
}

export default connect(mapStateToProps)(TrackList);

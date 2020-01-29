import React from "react";
import styled from "styled-components";
import { style } from "../config";

import Track from "../containers/Track.jsx";

const StyledList = styled.ul`
  padding: 0 0 ${style.sizeSm} 0;
  max-height: 400px;
  overflow-y: scroll;
`;

class TrackList extends React.Component {
  render() {
    return (
      <StyledList className={this.props.className}>
        {this.props.tracks.map((track, index) => (
          <Track key={track.id} {...track} />
        ))}
      </StyledList>
    );
  }
}

export default TrackList;

import React from "react";
import styled from "styled-components";
import { style } from "../config";

import Track from "../containers/Track.jsx";

const StyledList = styled.ul`
  flex: 1;
  padding: 0 0 ${style.sizeSm} 0;
`;

class TrackList extends React.Component {
  render() {
    return (
      <StyledList className={this.props.className}>
        {this.props.tracks.map((track, index) => {
          return <Track key={track.id} {...track} />;
        })}
      </StyledList>
    );
  }
}

export default TrackList;

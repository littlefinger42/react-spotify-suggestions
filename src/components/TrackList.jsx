import React from "react";
import styled from "styled-components";
import { style } from "../config"

import Track from "./Track.jsx";

const StyledList = styled.ul`
  padding: 0 0 ${style.sizeSm} 0;
`;

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }

  trackClicked = (track, event) => {
    this.props.trackClicked(track, event);
  }

  render() {
    return (
      <StyledList>
        {this.props.tracks.map(item => (
          <Track
            key={item.id}
            handleClick={this.trackClicked}
            {...item}
          />
        ))}
      </StyledList>
    );
  }
}

export default TrackList;

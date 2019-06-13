import React from "react";
import styled from "styled-components";

import Track from "./Track.jsx";

const StyledList = styled.ul`
  padding: 0;
`;

class TrackList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      tracks: [ ...props.tracks ]
    };
  }


  handleClick(track, event) {
    this.props.handleClick(track, event);
  }

  // this.tracks.setState

  render() {
    return (
      <StyledList>
        {this.props.tracks.map(item => (
          <Track
            key={item.id}
            handleClick={this.props.handleClick}
            {...item}
          />
        ))}
      </StyledList>
    );
  }
}

export default TrackList;

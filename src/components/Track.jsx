import React from "react";
import styled from "styled-components";

import Card from "./Card.jsx"

const TrackLi = styled.li`
  list-style: none;
`;

const TrackTitle = styled.span`
  font-size: 14px;
  color: #CCC;
`;

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  onChangeCheckbox(event) {
    this.setState({ active: !this.state.active });
    this.props.handleClick(this, event);
  }

  render() {
    return (
      <label>
        <TrackLi>
          <Card className={this.state.active ? "active" : ""}>
            <input
              type="checkbox"
              checked={this.state.active}
              onChange={(e) => this.onChangeCheckbox(e)}
            />
            <TrackTitle>{this.props.name}</TrackTitle>
            <TrackTitle>
              {this.props.artists.map(artist => artist.name + " ")}
            </TrackTitle>
            <audio controls preload="metadata" src={this.props.preview_url} />
          </Card>
        </TrackLi>
      </label>
    );
  }
}

export default Track;

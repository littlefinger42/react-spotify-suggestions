import React from "react";
import styled from "styled-components";

const TrackLi = styled.li`
  list-style: none;
  margin: 8px 0;
  padding: 16px;
  border: 1px #ddd solid;
  border-radius: 4px;
  color: #777;
  box-shadow: #eee 0px 0px 8px;
  &.checked {
    box-shadow: #7f7 0px 0px 8px;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TrackTitle = styled.span`
  font-size: 14px;
  color: #555;
`;

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  onChangeCheckbox(event) {
    this.setState({ checked: !this.state.checked });
    this.props.handleClick(this, event);
  }

  render() {
    return (
      <label>
        <TrackLi className={this.state.checked ? "checked" : ""}>
          <input
            type="checkbox"
            checked={this.state.checked}
            onChange={(e) => this.onChangeCheckbox(e)}
          />
          <TrackTitle>{this.props.name}</TrackTitle>
          <TrackTitle>
            {this.props.artists.map(artist => artist.name + " ")}
          </TrackTitle>
          <audio controls preload="metadata" src={this.props.preview_url} />
        </TrackLi>
      </label>
    );
  }
}

export default Track;

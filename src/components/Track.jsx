import React from "react";
import styled from "styled-components";
import { style } from "../config";

import Card from "./Card.jsx";
import Audio from "./Audio.jsx";

const TrackAudio = styled.div`
  padding-top: 8px;
  flex: 0 1 100%;
  @media ${style.device.tablet} {
    padding-top: 0px;
    flex: 0 1 40%;
  }
  @media ${style.device.laptop} {
    flex: 0 1 30%;
  }
`;

const TrackLi = styled.li`
  list-style: none;
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
              onChange={e => this.onChangeCheckbox(e)}
            />
            <a
              href={this.props.external_urls.spotify}
              title={"Find " + this.props.name + " on spotify"}
              rel="noreferrer"
              target="_blank"
            >
              {this.props.name}
            </a>
            <span>
              {this.props.artists.map(artist => {
                return (
                  <span key={artist.id}>
                    <a
                      href={artist.external_urls.spotify}
                      title={"Find " + this.props.name + " on Spotify"}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {artist.name}
                    </a>
                    <span> </span>
                  </span>
                );
              })}
            </span>
            <TrackAudio>
              <Audio src={this.props.preview_url} controls preload="metadata" />
            </TrackAudio>
          </Card>
        </TrackLi>
      </label>
    );
  }
}

export default Track;

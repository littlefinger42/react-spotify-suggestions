import React from "react";
import styled from "styled-components";
import { style } from "../config";

import Card from "./Card.jsx";
import Audio from "./Audio.jsx";

const TrackItem = styled(Card)`
  padding-left: 80px;
  @media ${style.device.tablet} {
    padding-left: 80px;
   }
`

const TrackAudio = styled.div`
  padding-top: 4px;
  flex: 0 1 100%;
  @media ${style.device.tablet} {
    padding-top: 0px;
    flex: 0 1 40%;
  }
  @media ${style.device.laptop} {
    flex: 0 1 30%;
  }
`;

const TrackImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const TrackLi = styled.li`
  list-style: none;
  cursor: pointer;
`;

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  handleClick = () => {
    this.setState({ active: !this.state.active });
    this.props.handleClick(this, !this.state.active);
  }

  render() {
    return (
      <TrackLi onClick={this.handleClick}>
        <TrackItem className={this.state.active ? "active" : ""}>
          <TrackImage src={this.props.album.images[2].url} async />
          <span></span>
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
        </TrackItem>
      </TrackLi>
    );
  }
}

export default Track;

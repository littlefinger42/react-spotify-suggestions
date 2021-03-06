import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { style } from "../config";

import { addSelectedTrack, removeSelectedTrack } from "../store/actions/index";

import Audio from "../components/Audio.jsx";

const TrackItem = styled.div`
  margin-bottom: ${style.sizeXs};
  position: relative;
  align-items: center;
  padding: ${style.sizeXs} 0 ${style.sizeXs} 80px;
  &.active {
    background-color: ${style.blackLevelThree};
  }
`;

const TrackText = styled.div`
  padding-bottom: 8px;
  font-size: ${style.fontSize};
`;

const TrackAudio = styled.div`
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
`;

const TrackLi = styled.li`
  list-style: none;
  cursor: pointer;
`;

const mapDispatchToProps = dispatch => {
  return {
    addSelectedTrack: prop => dispatch(addSelectedTrack(prop)),
    removeSelectedTrack: prop => dispatch(removeSelectedTrack(prop))
  };
};

class Track extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    if (!this.props.selected) {
      this.props.addSelectedTrack(this.props);
    } else {
      this.props.removeSelectedTrack(this.props.id);
    }
  };

  render() {
    const { album, selected } = this.props;

    return (
      <TrackLi onClick={this.handleClick}>
        <TrackItem className={selected ? "active" : ""}>
          {album &&
            Array.isArray(album.images) &&
            album.images.length > 1 &&
            album.images[2].url && (
              <TrackImage src={album.images[2].url} async />
            )}
          <TrackText>
            <a
              href={this.props.external_urls.spotify}
              title={"Find " + this.props.name + " on Spotify"}
              rel="noreferrer"
              target="_blank"
            >
              {this.props.name} {" - "}
            </a>

            {this.props.artists.map(artist => (
              <span key={artist.id}>
                <a
                  href={artist.external_urls.spotify}
                  title={"Find " + this.props.name + " on Spotify"}
                  rel="noreferrer"
                  target="_blank"
                >
                  {artist.name}&nbsp;
                </a>
              </span>
            ))}
          </TrackText>

          <TrackAudio>
            <Audio src={this.props.preview_url} controls preload="metadata" />
          </TrackAudio>
        </TrackItem>
      </TrackLi>
    );
  }
}

export default connect(null, mapDispatchToProps)(Track);

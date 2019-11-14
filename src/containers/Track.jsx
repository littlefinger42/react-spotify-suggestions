import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { style } from "../config";

import { addSelectedTrack, removeSelectedTrack } from "../store/actions/index";

import Card from "../components/Card.jsx";
import Audio from "../components/Audio.jsx";

const TrackItem = styled(Card)`
  margin-bottom: ${style.sizeXs};
  align-items: center;
  padding: ${style.sizeXs} 0 ${style.sizeXs} 80px;
`;

const TrackText = styled.span`
  flex: 1 1 0;
  font-size: ${style.fontSize};
`;

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
    this.state = {
      active: false
    };
  }

  handleClick = () => {
    this.setState({ active: !this.state.active });
    this.props.handleClick(this, !this.state.active);
    if (!this.state.active) {
      this.props.addSelectedTrack(this.props.id);
    } else {
      this.props.removeSelectedTrack(this.props.id);
    }
  };

  render() {
    const { album } = this.props;

    return (
      <TrackLi onClick={this.handleClick}>
        <TrackItem className={this.state.active ? "active" : ""}>
          {album &&
            Array.isArray(album.images) &&
            album.images.length > 1 &&
            album.images[2].url && (
              <TrackImage src={album.images[2].url} async />
            )}
          <TrackText>
            <a
              href={this.props.external_urls.spotify}
              title={"Find " + this.props.name + " on spotify"}
              rel="noreferrer"
              target="_blank"
            >
              {this.props.name}
            </a>
          </TrackText>
          <TrackText>
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

import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { style } from "../config";

import { addSelectedTrack, removeSelectedTrack } from "../store/actions/index";

const TrackItem = styled.div`
  margin-bottom: 4px;
  align-items: center;
  padding: ${style.sizeXs / 2} 0;
`;

const TrackText = styled.div`
  padding-bottom: 4;
  display: flex;
  justify-content: space-between;
  font-size: ${style.fontSize};
`;

const TrackLi = styled.li`
  list-style: none;
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

  render() {
    return (
      <TrackLi>
        <TrackItem>
          <TrackText>
            <span>
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
            </span>

            <a
              href="#"
              onClick={() => this.props.removeSelectedTrack(this.props.id)}
            >
              Remove
            </a>
          </TrackText>
        </TrackItem>
      </TrackLi>
    );
  }
}

export default connect(null, mapDispatchToProps)(Track);

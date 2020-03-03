import React from "react";
import styled from "styled-components";
import { style } from "../config";
import { connect } from "react-redux";

import { getUserAccessToken, getSpotifyUserId } from "../store/selectors/index";

import TrackList from "./TrackList.jsx";
import Card from "../components/Card.jsx";
import Alert from "../components/Alert.jsx";
import Pagination from "../components/Pagination.jsx";

const OutputContainerCountainer = styled(Card)`
  flex: 1;
`;
const OutputItem = styled.div`
  flex: 1;
  margin-bottom: ${style.sizeSm};
  &:last-child {
    margin-bottom: 0;
  }
`;
const OutputContainerHeader = styled.div`
  margin-bottom: ${style.sizeSm};
  display: flex;
  justify-content: space-between;
`;
const OutputContainerTitle = styled.h2`
  font-size: 14px;
  @media ${style.device.tablet} {
    font-size: 16px;
  }
  @media ${style.device.laptop} {
    font-size: 18px;
  }
`;

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state),
      spotify: {
        id: getSpotifyUserId(state)
      }
    }
  };
};

class OutputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.abortController = new AbortController();
    this.state = {
      isLoading: false,
      selectedTrackList: this.props.tracks.length - 1,
      alert: {
        type: "",
        message: ""
      }
    };
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tracks.length - 1 !== this.state.selectedTrackList) {
      this.setState({ selectedTrackList: nextProps.tracks.length - 1 });
    }
  }
  switchList = (event, id) => {
    this.setState({ selectedTrackList: id });
  };
  render() {
    return (
      <OutputContainerCountainer>
        <OutputContainerHeader>
          <OutputContainerTitle>Suggested Tracks</OutputContainerTitle>
          <div>
            <Pagination
              handleClick={this.switchList}
              selectedPageId={this.state.selectedTrackList}
              pages={this.props.tracks}
            />
          </div>
        </OutputContainerHeader>
        {this.state.alert.type && this.state.alert.message && (
          <OutputItem>
            <Alert type={this.state.alert.type}>
              {this.state.alert.message}
            </Alert>
          </OutputItem>
        )}
        <OutputItem>
          <div style={{ width: "100%" }}>
            {this.props.tracks.map((trackList, index) => (
              <TrackList
                className={
                  index === this.state.selectedTrackList ? "" : "hidden"
                }
                key={index}
                id={index}
                tracks={trackList}
              />
            ))}
          </div>
        </OutputItem>
      </OutputContainerCountainer>
    );
  }
}

export default connect(mapStateToProps)(OutputContainer);

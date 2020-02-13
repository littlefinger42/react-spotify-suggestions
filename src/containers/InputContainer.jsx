import React from "react";
import styled from "styled-components";
import { style } from "../config";
import { connect } from "react-redux";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

import {
  getTouchedRecommendationParams,
  getSelectedTracks,
  getUserAccessToken
} from "../store/selectors/index";
import {
  clearSearchParams,
  addRecommendedTracks
} from "../store/actions/index";

import spotifyUtils from "../utils/spotifyUtils";

import Alert from "../components/Alert.jsx";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Spinner from "../components/Spinner.jsx";
import TrackList from "../containers/TrackList.jsx";
import TopTracks from "./TopTracks.jsx";
import RecentTracks from "./RecentTracks.jsx";
import SearchTracks from "./SearchTracks.jsx";
import RecommendationsSelector from "./RecommendationsSelector.jsx";

const InputContainerContainer = styled(Card)`
  flex-basis: 100%;
  flex-grow: 0;
  @media ${style.device.tablet} {
    flex-basis: 50%;
  }
`;
const InputItem = styled.div`
  flex: 1;
  margin-bottom: ${style.sizeSm};
  &:last-child {
    margin-bottom: 0;
  }
`;
const InputItemHeader = styled.h3`
  margin-bottom: ${style.sizeXs};
  cursor: pointer;
  font-size: 14px;
  @media ${style.device.tablet} {
    font-size: 16px;
  }
  @media ${style.device.laptop} {
    font-size: 18px;
  }
`;
const InputContainerHeader = styled.div`
  margin-bottom: ${style.sizeSm};
`;
const InputContainerTitle = styled.h2`
  font-size: 16px;
  @media ${style.device.tablet} {
    font-size: 18px;
  }
  @media ${style.device.laptop} {
    font-size: 20px;
  }
`;

const mapStateToProps = state => {
  return {
    user: {
      accessToken: getUserAccessToken(state),
      touchedRecommendationParams: getTouchedRecommendationParams(state)
    },
    selectedTracks: getSelectedTracks(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearSearchParams: prop => dispatch(clearSearchParams(prop)),
    addRecommendedTracks: prop => dispatch(addRecommendedTracks(prop))
  };
};

class InputContainer extends React.Component {
  notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  constructor(props) {
    super(props);
    this.abortController = new AbortController();
    this.state = {
      isLoading: false,
      alert: {
        type: "",
        message: ""
      },
      tabOpen: "topTracks"
    };
  }

  /**
   * Uses spotify utils to fetch recommendations based on selected tracks in the state, then sets them to the state
   */
  getRecommendations = () => {
    const { user, addRecommendedTracks } = this.props;

    if (this.props.selectedTracks.length === 0) {
      this.setState({
        alert: {
          type: "warning",
          message: "Select some tracks as seeds first!"
        }
      });
      return false;
    }

    this.setState({ isLoading: true });
    spotifyUtils
      .getSpotifyRecommendations(
        user.accessToken,
        this.props.selectedTracks.map(track => track.id),
        user.touchedRecommendationParams,
        this.abortController
      )
      .then(response => {
        if (response.error) {
          this.setState({
            isLoading: false,
            alert: { type: "danger", message: response.error }
          });
          return false;
        }
        addRecommendedTracks(response);
        this.setState({
          isLoading: false
        });
      });
  };

  toggleTab = tab =>
    this.setState(prevState => ({
      tabOpen: prevState.tabOpen === tab ? "" : tab
    }));

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    const { isLoading, alert, tabOpen } = this.state;

    const touchedParamsList = this.props.user.touchedRecommendationParams.map(
      param => {
        return (
          <li key={param.id} style={{ marginTop: 10 }}>
            {param.label}:{" "}
            {param.id === "key"
              ? this.notes[param.value - 1]
              : `${Math.round(param.value / param.step)}/${param.range[1] /
                  param.step}`}
          </li>
        );
      }
    );

    return (
      <InputContainerContainer>
        <InputContainerHeader>
          <InputContainerTitle>Input</InputContainerTitle>
        </InputContainerHeader>
        {alert.type && alert.message && (
          <InputItem>
            <Alert type={alert.type}>{alert.message}</Alert>
          </InputItem>
        )}
        <InputItem>
          <InputItemHeader onClick={() => this.toggleTab("selectedTracks")}>
            Selected Tracks ({this.props.selectedTracks.length})
            {tabOpen === "selectedTracks" ? <MdExpandLess /> : <MdExpandMore />}
          </InputItemHeader>
          {tabOpen === "selectedTracks" &&
            (this.props.selectedTracks.length > 0 ? (
              <TrackList min tracks={this.props.selectedTracks} />
            ) : (
              <Alert type="warning">
                Select some tracks from search, top tracks or recent track lists
                to use as seeds to suggestions.
              </Alert>
            ))}
        </InputItem>
        <InputItem>
          <InputItemHeader
            onClick={() => this.toggleTab("suggestionParameters")}
          >
            Suggestion Parameters (
            {this.props.user.touchedRecommendationParams.length})
            {tabOpen === "suggestionParameters" ? (
              <MdExpandLess />
            ) : (
              <MdExpandMore />
            )}
          </InputItemHeader>
          {tabOpen === "suggestionParameters" && (
            <div>
              <InputItem>
                <RecommendationsSelector />
              </InputItem>

              <InputItem>
                <ul>
                  {touchedParamsList && touchedParamsList.length === 0 && (
                    <li>None Selected</li>
                  )}
                  {touchedParamsList}
                  {touchedParamsList && touchedParamsList.length > 0 && (
                    <li style={{ marginTop: 10 }}>
                      <Button handleClick={this.props.clearSearchParams}>
                        Clear
                      </Button>
                    </li>
                  )}
                </ul>
              </InputItem>
            </div>
          )}
        </InputItem>
        <InputItem>
          <InputItemHeader onClick={() => this.toggleTab("topTracks")}>
            Top Tracks
            {tabOpen === "topTracks" ? <MdExpandLess /> : <MdExpandMore />}
          </InputItemHeader>
          {tabOpen === "topTracks" && <TopTracks />}
        </InputItem>
        <InputItem>
          <InputItemHeader onClick={() => this.toggleTab("recentTracks")}>
            Recent Tracks
            {tabOpen === "recentTracks" ? <MdExpandLess /> : <MdExpandMore />}
          </InputItemHeader>
          {tabOpen === "recentTracks" && <RecentTracks />}
        </InputItem>
        <InputItem>
          <InputItemHeader onClick={() => this.toggleTab("searchTracks")}>
            Search Tracks
            {tabOpen === "searchTracks" ? <MdExpandLess /> : <MdExpandMore />}
          </InputItemHeader>
          {tabOpen === "searchTracks" && <SearchTracks />}
        </InputItem>
        <InputItem>
          <Button
            disabled={this.props.selectedTracks.length < 1 || isLoading}
            handleClick={this.getRecommendations}
          >
            Suggest tracks
          </Button>
          {isLoading && <Spinner />}
        </InputItem>
      </InputContainerContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputContainer);

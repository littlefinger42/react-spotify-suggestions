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
import TopTracks from "./TopTracks.jsx";
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
`;
const InputContainerHeader = styled.div`
  height: 50px;
  padding-bottom: ${style.sizeSm};
  margin-bottom: ${style.sizeSm};
  display: flex;
  justify-content: space-between;
`;
const InputContainerTitle = styled.h2`
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
      tabsOpen: {
        topTracks: true,
        searchTracks: false,
        suggestionParameters: false
      }
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
        this.props.selectedTracks,
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
      tabsOpen: {
        ...prevState.tabsOpen,
        [tab]: !prevState.tabsOpen[tab]
      }
    }));

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    const { isLoading, alert, tabsOpen } = this.state;

    const touchedParamsList = this.props.user.touchedRecommendationParams.map(
      param => {
        return (
          <li key={param.id}>
            {param.label}:{" "}
            {param.id === "key"
              ? this.notes[param.value - 1]
              : Math.round(param.value / param.step)}
          </li>
        );
      }
    );

    return (
      <InputContainerContainer>
        <InputContainerHeader>
          <InputContainerTitle>Input</InputContainerTitle>
          <span style={{ flexBasis: "50%" }}>
            <InputItem>
              <strong>Seed Tracks: </strong>
              {this.props.tracksSelected}
            </InputItem>
            <InputItem>
              <strong>Suggestion Parameters: </strong>
              {this.props.user.touchedRecommendationParams.length > 0 ? (
                <span>
                  {this.props.user.touchedRecommendationParams
                    .map(param => param.label)
                    .join(", ")}
                </span>
              ) : (
                "None"
              )}
            </InputItem>
          </span>
        </InputContainerHeader>
        {alert.type && alert.message && (
          <InputItem>
            <Alert type={alert.type}>{alert.message}</Alert>
          </InputItem>
        )}
        <InputItem>
          <InputItemHeader onClick={() => this.toggleTab("topTracks")}>
            Top Tracks
            {tabsOpen.topTracks ? <MdExpandLess /> : <MdExpandMore />}
          </InputItemHeader>
          {tabsOpen.topTracks && <TopTracks />}
        </InputItem>
        <InputItem>
          <InputItemHeader onClick={() => this.toggleTab("searchTracks")}>
            Search Tracks
            {tabsOpen.searchTracks ? <MdExpandLess /> : <MdExpandMore />}
          </InputItemHeader>
          {tabsOpen.searchTracks && <SearchTracks />}
        </InputItem>
        <InputItem>
          <InputItemHeader
            onClick={() => this.toggleTab("suggestionParameters")}
          >
            Suggestion Parameters{" "}
            {tabsOpen.suggestionParameters ? (
              <MdExpandLess />
            ) : (
              <MdExpandMore />
            )}
          </InputItemHeader>
          {tabsOpen.suggestionParameters && (
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
                    <li>
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
